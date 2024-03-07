export enum ProtectedRoutes {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Categories = '/categories',
  Discover = '/discover',
  ForYou = '/for-you',
  AboutUs = '/about-us',
  Questions = '/questions',
  TermsAndConditions = '/terms-and-conditions',
  MyTravels = '/my-travels',
  AddTravel = '/my-travels/add-travel',
  EditTravel = '/my-travels/edit-travel'
}

export const routeProtectionStatus = Object.freeze({
  [ProtectedRoutes.Home]: false,
  [ProtectedRoutes.Login]: false,
  [ProtectedRoutes.Register]: false,
  [ProtectedRoutes.Categories]: false,
  [ProtectedRoutes.Discover]: true,
  [ProtectedRoutes.ForYou]: true,
  [ProtectedRoutes.AboutUs]: false,
  [ProtectedRoutes.Questions]: false,
  [ProtectedRoutes.TermsAndConditions]: false,
  [ProtectedRoutes.MyTravels]: true,
  [ProtectedRoutes.AddTravel]: true,
  [ProtectedRoutes.EditTravel]: true
})
