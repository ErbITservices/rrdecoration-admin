import jwt_decode from 'jwt-decode'


export function isAdmin(Token)  {
    const decodedToken = jwt_decode(Token)
    console.log(decodedToken)
    if(decodedToken.isAdmin === true){
        return true;    
    } else {
        return {success: false, error: "is not admin"};
    }
}

export function isValidTokenWithAdmin(Token) {
    const decodedToken = jwt_decode(Token);
    const currentDate = Date.now() / 1000;
      console.log(`currrent date : ${currentDate}`);
      console.log(`token date : ${decodedToken.exp}`);
      if(currentDate > decodedToken.exp){
        return {success: false, error: "token is expired"}
      } else {
        return isAdmin(Token)
      }
}
