export function setUserDetails(data) { //console.log('setUserDetails')
   // console.log(data)
    let country_currency_symbol='';
    if(data.planData!==undefined){
        country_currency_symbol = data.planData.country_currency_symbol
        data.planData.country_currency_symbol='';
    }
    localStorage.setItem('typeData', btoa(JSON.stringify(data)));
    localStorage.setItem('currency',country_currency_symbol)
}

export const getUserDetails = () => {
    if (localStorage.getItem('typeData') === null) {
        return '';
    }
    try {
        let userData = JSON.parse(atob(localStorage.getItem('typeData')));
        userData.planData.country_currency_symbol=localStorage.getItem('currency');
        return userData;
    } catch (e) {
        console.log(e)
        return
    }
}

export function setEntityData(data) {
    localStorage.setItem('entityData', btoa(JSON.stringify(data)));
}

export const getEntityData = () => {
    if (localStorage.getItem('entityData') === null) {
        return '';
    }
    try {
        const userData = JSON.parse(atob(localStorage.getItem('entityData')));
        return userData;
    } catch (e) {
        return
    }
}

export function setSocialUserDetails(data) {
     localStorage.setItem('socialData', btoa(JSON.stringify(data)));
 }
 
 export const getSocialUserDetails = () => {
     if (localStorage.getItem('socialData') === null) {
         return '';
     }
     try {
         let userSocialData = JSON.parse(atob(localStorage.getItem('socialData')));
         return userSocialData;
     } catch (e) {
         console.log(e)
         return
     }
 }

 export const removeSocialData = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('socialData');
        return true;
    }
}