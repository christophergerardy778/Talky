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

  getSocialProvider(accountType: ACCOUNT_TYPE) {
    switch (accountType) {
      case ACCOUNT_TYPE.GOOGLE:
        return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      case ACCOUNT_TYPE.FACEBOOK:
        return this.angularFireAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      default:
        return this.angularFireAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }

  buildUserBySocialProvider(credential: firebase.auth.UserCredential, accountType: ACCOUNT_TYPE): IUser {
    switch (accountType) {
      case ACCOUNT_TYPE.GOOGLE:
        const {name, picture} = credential.additionalUserInfo?.profile as any;
        return {
          id: credential.user!.uid,
          name: name,
          email: credential.user!.email!,
          registerBy: ACCOUNT_TYPE.GOOGLE,
          photoUrl: picture
        };
      case ACCOUNT_TYPE.FACEBOOK:
        const profile = credential.additionalUserInfo!.profile as any;
        return {
          id: credential.user!.uid,
          name: profile.name,
          email: credential.user!.email!,
          registerBy: ACCOUNT_TYPE.FACEBOOK,
          photoUrl: credential.user!.photoURL!
        }
      default:
        return {
          email: "",
          id: "",
          name: "",
          photoUrl: "",
          registerBy: ACCOUNT_TYPE.TWITTER
        }
    }
  }

  gerUser() {
    return this.angularFireAuth.user;
  }

  loginUserByEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async getUserInfoById(user_id: string) {
    return this.userCollection.ref.where("id", "==", user_id).get();
  }
}
