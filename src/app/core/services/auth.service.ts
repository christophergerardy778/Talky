import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {ACCOUNT_TYPE, IUser} from "../models/IUser";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection!: AngularFirestoreCollection<IUser>;

  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly angularFireDataBase: AngularFirestore
  ) {
    this.userCollection = this.angularFireDataBase.collection<IUser>("users");
  }

  async registerEmailUser(user: IUser) {

    const result = await this.userAlreadyExists(user.email);

    if (result.empty) {
      const newUser = await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password!);

      await this.createUserFirestore({
        id: newUser.user!.uid,
        name: user.name,
        email: user.email,
        registerBy: ACCOUNT_TYPE.EMAIL,
        photoUrl: "https://www.uprm.edu/natatorio/wp-content/uploads/sites/142/2018/11/profile-placeholder.png",
      });

    } else {
      throw new Error("User already use");
    }
  }

  createUserFirestore(user: IUser) {
    return this.userCollection.add(user);
  }

  userAlreadyExists(email: string) {
    return this.userCollection.ref
      .where("email", "==", email)
      .get();
  }

  async registerSocialUser(accountType: ACCOUNT_TYPE) {
    switch (accountType) {
      case ACCOUNT_TYPE.GOOGLE:
        return this.registerUserGoogle();
    }
  }

  async registerUserGoogle() {
    const result = await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const {name, picture} = result.additionalUserInfo?.profile as any;
    const response = await this.userAlreadyExists(result.user!.email!);

    if (response.empty) {
      if (result.additionalUserInfo!.isNewUser) {
        await this.createUserFirestore({
          id: result.user!.uid,
          name: name,
          email: result.user!.email!,
          registerBy: ACCOUNT_TYPE.GOOGLE,
          photoUrl: picture
        })
      }
    } else {
      const authUser = await this.angularFireAuth.currentUser;
      await authUser!.delete();
      throw Error("Email already in use");
    }
  }
}
