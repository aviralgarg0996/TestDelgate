'use strict';
import {
	Platform,
	AsyncStorage
} from 'react-native';
import _ from "underscore";
import { startLoading, stopLoading, showToast, hideToast } from './app';
import { goBack, reset } from './nav';
import { setDetails } from './location';
import RestClient from '../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';
//import { destroySocketClient } from '../../utilities/SocketClient';
import { cancelAllLocalNotifications } from '../../utilities/PushNotification';
import  axios  from "axios";

// Actions
export const REGISTER_NEW_USER  = "REGISTER_NEW_USER";
export const PHONE_VERIFICATION = "PHONE_VERIFICATION";
export const USER_LOGIN = "USER_LOGIN";
export const LOG_OUT = "LOGOUT";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const OTP_VERIFY = "OTP_VERIFY";
export const CONSUMER_SIGNUP_PHONE = "CONSUMER_SIGNUP_PHONE";
export const DEVICE_TOKEN = "DEVICE_TOKEN";
export const GET_DRIVER_DATA = "GET_DRIVER_DATA";
export const GET_DRIVER_DATA_STATUS = "GET_DRIVER_DATA_STATUS";
export const NAVIGATE_TO_DRIVER_FORM = "NAVIGATE_TO_DRIVER_FORM";
export const DRIVER_AVAILABILITY_STATUS = "DRIVER_AVAILABILITY_STATUS";
export const DRIVER_FORM_NAV = "DRIVER_FORM_NAV";
export const CITIES_LIST = "CITIES_LIST";
export const CERTIFICATES_LIST = "CERTIFICATES_LIST";
export const EXPERIENCETYPE_LIST = "EXPERIENCETYPE_LIST";
export const VEHICLETYPE_LIST = "VEHICLETYPE_LIST";
export const VEHICLECOMPANY_LIST = "VEHICLECOMPANY_LIST";
export const VEHICLEMODAL_LIST = "VEHICLEMODAL_LIST";

// Action Creators
export const CONSUMER_SIGNUP = (data) => ({ type: REGISTER_NEW_USER,data});
export const VERIFY_PHONE = (data) => ({ type: PHONE_VERIFICATION,data});
export const LOGIN = (data) => ({ type: USER_LOGIN,data});
export const LOG_OUT_SUCCESS = () => ({ type: LOG_OUT});
export const FORGOT_PASSWORD_SUCCESS = (data) => ({ type: FORGOT_PASSWORD,data});
export const OTP_VERIFY_SUCCESS = (data) => ({ type: OTP_VERIFY,data});
export const CONSUMER_SIGNUP_PHONE_VERICATION = (data) => ({ type: CONSUMER_SIGNUP_PHONE, data });
export const setDeviceToken = (data) => ({ type: DEVICE_TOKEN, data });
export const GET_DRIVER = (data) => ({ type: GET_DRIVER_DATA, data });
export const GET_DRIVER_STATUS = (data) => ({ type: GET_DRIVER_DATA_STATUS, data });
export const NAVIGATE_DRIVER_FORM = (data) => ({ type: NAVIGATE_TO_DRIVER_FORM, data });
export const DRIVER_AVAILABILITY = (data) => ({ type: DRIVER_AVAILABILITY_STATUS, data });
export const DRIVER_FORM_NAVIGATION = (data) => ({ type: DRIVER_FORM_NAV, data });
export const GET_CITIES_LIST = (data) => ({ type: CITIES_LIST, data });
export const GET_CERTIFICATES_LIST = (data) => ({ type: CERTIFICATES_LIST, data });
export const GET_EXPERIENCETYPE_LIST = (data) => ({ type: EXPERIENCETYPE_LIST, data });
export const GET_VEHICLETYPE_LIST = (data) => ({ type: VEHICLETYPE_LIST, data });
export const GET_VEHICLECOMPANY_LIST = (data) => ({ type: VEHICLECOMPANY_LIST, data });
export const GET_VEHICLEMODAL_LIST = (data) => ({ type: VEHICLEMODAL_LIST, data });
//perform api's related to user

/**
* Signup API.
*/
var token;
export const consumerSignup = (data) => {
	//console.log('data ********* ',data)
	let agreeTerms;
	if(data.termsAndConditions){
		agreeTerms = 'agree'
	}
	let	requestObject = {
		email     : data.email.trim(),
		//password  : data.password.value,
		password  : data.password.value,
		phone  : data.phone,
		agree: agreeTerms,
		deviceToken :  data.deviceToken,
		role:'DRIVER'
    }
  // let deviceDetails = {
  //   deviceType : Platform.OS==="ios"?"ios":"android",
  //   deviceToken :  data.deviceToken,
  // }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/",requestObject).then((result) => {
			//console.log('result signup ******* ',result)
 		if(result.status == 1){
    		dispatch(stopLoading());
    		// if(result.data.emailVerified == 1 && result.data.phoneVerified == 1){
    		// 	dispatch(CONSUMER_SIGNUP(result));
    		// }
    		if(result.data.phoneVerified == 0){
    			//console.log('inside phone Verification not done ********* ',result.data.phone)
    			dispatch(CONSUMER_SIGNUP_PHONE_VERICATION({phone:result.data.phone,email:result.data.email}));
    			dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:true})
				}
				if(result.data.emailVerified == 0){
    			//console.log('inside phone Verification not done ********* ',result.data.phone)
    			dispatch(CONSUMER_SIGNUP_PHONE_VERICATION({phone:result.data.phone,email:result.data.email}));
    			dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:true})
    		}
	    	dispatch(ToastActionsCreators.displayInfo(result.message));
	  	}else{
	    	dispatch(stopLoading());
	    	dispatch(ToastActionsCreators.displayInfo(result.message));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/**
* Phone Verification API.
*/
export const phoneVerification = (data) => {
	//console.log('data ********* ',data)
	let	requestObject = {
		phone  : data.phone,
		phoneOtp : data.code
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/phoneOtpMatch",requestObject).then((result) => {
			console.log('result signup ******* ',result)
 		if(result.status==1){
    		dispatch(stopLoading());
    		dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})
    		dispatch({type:'EMAILVERIFICATION_VISIBILITY',visibility:true})
	    	//dispatch(ToastActionsCreators.displayInfo(result.message));
	  	}else{
	    	dispatch(stopLoading());
	    	alert(result.message);
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/**
* Phone resend API.
*/
export const resendPhoneApi = (data) => {
	//console.log('data ********* ',data)
	let	requestObject = {
		phone  : data,
	}

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/phoneResendRegistration",requestObject).then((result) => {
			console.log('result resend ******* ',result)
 		if(result.status==1){
				dispatch(stopLoading());
				alert(result.message);
	  	}else{
	    	dispatch(stopLoading());
	    	alert(result.message);
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/**
* Email Verification API.
*/
export const emailVerification = (data) => {
	//console.log('data ********* ',data)
	let	requestObject = {
		emailOtp  : data.code,
		email : data.email.trim()
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/emailOtpMatch",requestObject).then((result) => {
			console.log('result email verify ******* ',result)
 		if(result.status==1){
    		dispatch(stopLoading());
    		dispatch({type:'EMAILVERIFICATION_VISIBILITY',visibility:false})
			dispatch({type:'NEWUSER_VISIBILITY',visibility:true,token:result.token})
		 	dispatch(NAVIGATE_DRIVER_FORM(result))
	  	}else{
	    	dispatch(stopLoading());
	    	alert(result.message);
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/**
* Resend Email API.
*/
export const resendEmailApi = (data) => {
	//console.log('data ********* ',data)
	let	requestObject = {
		email : data
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/emailResendRegistration",requestObject).then((result) => {
			//console.log('result email verify ******* ',result)
 		if(result.status==1){
    		dispatch(stopLoading());
				alert(result.message);
	  	}else{
	    	dispatch(stopLoading());
	    	alert(result.message);
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/**
* Login API.
*/
export const userLogin = (data) => {
	//console.log('data ********* ',data)
	let	requestObject = {
		email  : data.email.trim(),
		password : data.password,
		deviceToken :  data.deviceToken,
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/login",requestObject).then((result) => {
			console.log('result login ******* ',result)
			AsyncStorage.setItem("token",result.token)
 		if(result.status == 1)
    {
    		dispatch(stopLoading());
    		if(result.data.emailVerified == 0 && result.data.phoneVerified == 0)
        {
          dispatch(CONSUMER_SIGNUP_PHONE_VERICATION({phone:result.data.phone,email:result.data.email}));
          if(result.data.emailVerified == 0)
          {
            //console.log('inside phone Verification not done ********* ',result.data.phone)

            dispatch({type:'EMAILVERIFICATION_VISIBILITY',visibility:true})
          }
          if(result.data.phoneVerified == 0)
          {
            //console.log('inside phone Verification not done ********* ',result.data.phone)
            //dispatch(CONSUMER_SIGNUP_PHONE_VERICATION({phone:result.data.phone,email:result.data.email}));
            dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:true})
          }

          //dispatch(ToastActionsCreators.displayInfo(result.message));
				}
				else if(result.data)
        {
  				if(result.data.multiRole[0].status == false){
  					dispatch(DRIVER_FORM_NAVIGATION(result))
  					//dispatch(NAVIGATE_DRIVER_FORM(result))
  				}
  				else{
  					if(result.data.driverStatus == 'pending'){
  						dispatch({type:'FORMSUBMIT_VISIBILITY',visibility:true})
  					}
      				dispatch(LOGIN(result));
  				}
       }
  	}
    else{
    	dispatch(stopLoading());
    	dispatch(ToastActionsCreators.displayInfo(result.message));
  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/**
* Driver Profile page one API.
*/
export const userDriverForm= (data) => {
	// alert(JSON.stringify(data))
	console.log('data ********* ',data)
		let body = new FormData();
		if (data.ProfileImageSource && data.ProfileImageSource.fileName) {
			//console.log('inside profile if statemetn ********')
			body.append('profilePic', {uri: data.ProfileImageSource.uri, name: data.ProfileImageSource.fileName, filename: data.ProfileImageSource.fileName, type: data.ProfileImageSource.type});
		}
		else {
		//	console.log('inside else profilePic *********')
			body.append('profilePic', "")
		}

		body.append('licenseNo', data.licenceNumber);
		body.append('licenceDate', data.licenceIssueDate);
		body.append('dob', data.birthDate);
    body.append('gender', data.sex);
		body.append('ssn', data.sinNumber)
		body.append('address', data.address);
		body.append('about', data.aboutYou);
		body.append('page', "1");
		body.append('experienceYear', "");
		body.append('experienceMon', "");
    var arr1=[];
    // if(data.experience.length>0)
    // {
    //   data.experience.map((item,i) => {
    //     arr1[i]=item._id;
    //   });
    // }
    body.append('experienceType',JSON.stringify(arr1));
		body.append('firstName', data.firstName);
		body.append('lastName', data.lastName);
		body.append('role', "DRIVER");
		body.append('lat', "45.63");
		body.append('lng', "52.36");
		//body.append('cities',JSON.stringify(data.cities));
    var arr1=[];
    // if(data.cities.length>0)
    // {
    //   data.cities.map((item,i) => {
    //     arr1[i]=item._id;
    //   });
    // }
    //body.append('servingareas',JSON.stringify(arr1));
		/*if (data.imgSourceExperience) {
			data.imgSourceExperience.map((item, i) => {
	           let filename = item.fileName;
	           body.append('add_image', {
	               uri: item.uri,
	               name: filename,
	               type: item.type
	           });
	       	})
		}
		else {
			body.append('add_image', data.imgSourceExperience)
		}*/

		//body.append('certificates',JSON.stringify(data.certificates));
		////body.append('cities', data.locationServe);
		console.log('data body  ********* ',body)
console.log("token",token)
		return dispatch => {
			dispatch(startLoading());
			RestClient.imageUpload("users/profile",body,data.token).then((result) => {
				console.log('result profile ******* ',result)
			 if(result.status == 1){
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
						// dispatch(ToastActionsCreators.displayInfo(result.message));
				}else{

					dispatch(stopLoading());
					// dispatch(ToastActionsCreators.displayInfo(result.message));
				}
			}).catch(error => {
					console.log("error=> ", error)
					dispatch(stopLoading());
			});
		}
	};

	/**
	* Driver Profile page two API.
	*/
	export const userDriverSecondForm= (data,saveState,onSubmitform) => {
	console.log(' vehicle ********* ',data)

		let body = new FormData();

		body.append('plateNo', data.vehicleNumber);
		body.append('type', data.selectedVehicleId);
		body.append('make', data.selectedCompanyId);
		body.append('modelYear', data.selectedYear);
		body.append('model', data.selectedVehicleModal)
		body.append('insuranceNo', data.insuranceNumber);
		body.append('insuranceExp', data.insuranceExpiryDate);
		// if (data.imgSourceVehicle) {
		// 	data.imgSourceVehicle.map((item, i) => {
	  //          let filename = item.fileName;
	  //          body.append('addVehicleImage', {
	  //              uri: item.uri,
	  //              name: filename,
	  //              type: item.type
	  //          });
	  //      	})
		// }else{
		// 	body.append('addVehicleImage', data.imgSourceVehicle)
		// }
    // var arr1=[];
    // data.equipment.map((item,i) => {
    //   arr1[i]=item._id;
    // });
		//body.append('equipment', arr1);
		if (data.vehicleImage && data.vehicleImage.fileName) {
			body.append('addVehicleImage', { uri: data.vehicleImage.uri, name: data.vehicleImage.fileName, filename: data.vehicleImage.fileName, type: data.vehicleImage.type });
		}
		else {
			body.append('addVehicleImage', "")
		}
		if (data.LicenceImage && data.LicenceImage.fileName) {
			body.append('license', { uri: data.LicenceImage.uri, name: data.LicenceImage.fileName, filename: data.LicenceImage.fileName, type: data.LicenceImage.type });
		}
		else {
			body.append('license', "")
		}
		if (data.InsuranceImage && data.InsuranceImage.fileName) {
			body.append('insurance', { uri: data.InsuranceImage.uri, name: data.InsuranceImage.fileName, filename: data.InsuranceImage.fileName, type: data.InsuranceImage.type });
		}
		else {
			body.append('insurance', "")
		}
		if (data.Background && data.Background.fileName) {
			body.append('background', { uri: data.Background.uri, name: data.Background.fileName, filename: data.Background.fileName, type: data.Background.type });
		}
		else {
			body.append('background', "")
		}
		if (data.DriverExtract && data.DriverExtract.fileName) {
			body.append('abstract', { uri: data.DriverExtract.uri, name: data.DriverExtract.fileName, filename: data.DriverExtract.fileName, type: data.DriverExtract.type });
		}
		else {
			body.append('abstract', "")
		}
		body.append('page', '2');
		body.append('role', "DRIVER");
		body.append('agree', "1");
		body.append('submit', onSubmitform ? "1" : "");

		// if (data.vehicleDocs) {
		// 	data.vehicleDocs.map((item, i) => {
	 //           let filename = item.fileName;
	 //           body.append(data.imageType, {
	 //               uri: item.uri,
	 //               name: filename,
	 //               type: item.type
	 //           });
	 //       	})
		// }else{
		// 	body.append('addDocs', data.vehicleDocs)
		// }

		//body.append('addDocs', data.vehicleDocs);
		body.append('driverForm', data.saveState);
	
		return dispatch => {
			return new Promise(function(fulfill,reject){
			dispatch(startLoading());
			RestClient.imageUpload("users/profile",body,data.token).then((result) => {
				console.log('result vehicle info ******* ',result);
				fulfill("success");				
			 if(result.status == 1){
					dispatch(stopLoading());
					if(saveState) {
						if(result.data.driverStatus == 'pending'){
							dispatch({type:'FORMSUBMIT_VISIBILITY',visibility:true})
						}
						if(result.data.driverStatus == 'rejected'){
							dispatch({type:'FORMREJECT_VISIBILITY',visibility:true})
						}
					}
					dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
					// dispatch(ToastActionsCreators.displayInfo(result.message));
				}else{
					dispatch(stopLoading());
				 dispatch(ToastActionsCreators.displayInfo(result.message));
				}
			}).catch(error => {
					console.log("error=> ", error)
					dispatch(stopLoading());
			});


		})
			
	};
	}

/* Get Driver Api */
export const getDriverData =(token)=> {
  return dispatch => {
		dispatch(startLoading());
		console.log("tokennnnnn   :",JSON.stringify(token))
    RestClient.post("users/getDriver",{},token).then((result) => {
  	console.log('result getDriverData ****** ',result)
      if(result.status === 1){
        dispatch(stopLoading());
        // dispatch(ToastActionsCreators.displayInfo(result.message));
        dispatch(GET_DRIVER(result));
      }else{
        dispatch(stopLoading());
        // dispatch(ToastActionsCreators.displayInfo(result.message));
      }
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
}

/* Get Driver Api */
export const getDriverStatus =(token)=> {
  return dispatch => {
    dispatch(startLoading());
    RestClient.post("users/getDriver",{},token).then((result) => {
  	console.log('result getDriverData ****** ',result)
      if(result.status === 1){
        dispatch(stopLoading());
        // dispatch(ToastActionsCreators.displayInfo(result.message));
        dispatch(GET_DRIVER_STATUS(result));
      }else{
        dispatch(stopLoading());
        // dispatch(ToastActionsCreators.displayInfo(result.message));
      }
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
}

/**
*Logout user
**/
export const logout =(data)=> {

    return dispatch => {
    dispatch(startLoading());
    RestClient.post("users/logout",{},data).then((result) => {
    	console.log('result logout ****** ',result)
      if(result.status===1){
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo(result.message));
        dispatch(LOG_OUT_SUCCESS());
      }else{
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo(result.message));
      }
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
}

/**
* Forgot Password
**/
export const forgotPassword =(data)=> {
	console.log('data ****** ',data)
  return dispatch => {
    dispatch(startLoading());
    RestClient.post("users/forgotPassword",{email:data.email.trim()}).then((result) => {
    	console.log('result forgot ****** ',result)
      if(result.status===1){
        dispatch(stopLoading());
        //alert(result.message);
		dispatch(FORGOT_PASSWORD_SUCCESS(data.email))
		dispatch({type:'FORGOT_PASSWORD_VISIBILITY',visibility:false})
        dispatch({type:'OTP_VERIFICATION_VISIBILITY',visibility:true})

      }else{
        dispatch(stopLoading());
        alert(result.message);
      }
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
}

/**
* OTP Verification
**/
export const otpVerification =(data)=> {
	console.log('data ****** ',data)
  return dispatch => {
    dispatch(startLoading());
    RestClient.post("users/otpMatch",{otp:data.code,email:data.email.trim()}).then((result) => {
    	console.log('result otp ****** ',result)
      if(result.status===1){
        dispatch(stopLoading());
        dispatch(OTP_VERIFY_SUCCESS(data.code))
        dispatch({type:'OTP_VERIFICATION_VISIBILITY',visibility:false})
        dispatch({type:'RESET_PASSWORD_VISIBILITY',visibility:true})
      }else{
        dispatch(stopLoading());
        alert(result.message);
      }
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
}
export const resendForgotApi = (data) => {
	//console.log('data ********* ',data)
	let	requestObject = {
		email : data
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("users/resend",requestObject).then((result) => {
			//console.log('result email verify ******* ',result)
 		if(result.status==1){
    		dispatch(stopLoading());
				alert(result.message);
	  	}else{
	    	dispatch(stopLoading());
	    	alert(result.message);
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};
/**
* rest Password
**/
export const resetPassword =(data)=> {
	console.log('data ****** ',data)
  return dispatch => {
    dispatch(startLoading());
    RestClient.post("users/resetPassword",{email:data.email.trim(),password:data.password.value,otp:data.otp}).then((result) => {
    	console.log('result otp ****** ',result)
      if(result.status===1){
        dispatch(stopLoading());
        dispatch({type:'RESET_PASSWORD_VISIBILITY',visibility:false})
        dispatch(ToastActionsCreators.displayInfo(result.message));
      }else{
        dispatch(stopLoading());
        alert(result.message);
      }
    }).catch(error => {
      console.log("error=> " ,error)
      dispatch(stopLoading());
    });
  }
}


/***
 * Availibility status
***/
export const availibilityStatus = (data,token) => {

	let	requestObject = {
		"status" : data.status ,
    "isHelper" : data.isHelper,
    "isMobileHandler":data.isMobileHandler


    }
	console.log('rquest object  availibility Status ****** ',requestObject)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("drivers/setAvailablity",requestObject,token).then((result) => {
			console.log('result availibility ******* ',result)
 		if(result.status == 1){
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
				dispatch(DRIVER_AVAILABILITY(result.data));
	  	}else{
	    	dispatch(stopLoading());
	    	dispatch(ToastActionsCreators.displayInfo(result.message));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};



/***
 * get cities api
***/
export const getCitiesList = (token) => {
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("admin/getcity").then((result) => {
			console.log('result getCity ******* ',result)
 		if(result.status == 1){
				dispatch(stopLoading());
				dispatch(GET_CITIES_LIST(result.data));
	  	}else{
	    	dispatch(stopLoading());
	   // 	dispatch(ToastActionsCreators.displayInfo(result));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/***
 * get CERTIFICATES_LIST api
***/
export const getCertificatesList = (token) => {
	return dispatch => {
		dispatch(startLoading());
		RestClient.get("drivers/getCertificate",{},token).then((result) => {
			console.log('result getCertificate ******* ',result)
 		if(result.status == 1){
			dispatch(stopLoading());
			dispatch(GET_CERTIFICATES_LIST(result.data));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/***
 * get Experience Type api
***/
export const getExperienceTypeList = (token) => {
  return dispatch => {
		dispatch(startLoading());
		RestClient.post("admin/getexperience",{},token).then((result) => {
			console.log('result getexperience ******* ',result)
 		if(result.status == 1){
			dispatch(stopLoading());
			dispatch(GET_EXPERIENCETYPE_LIST(result.data));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
}

/***
 * get VEHICLE TYPE api
***/
export const getVehicleTypeList = (token) => {
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("admin/getvehicle",{},token).then((result) => {
			console.log('result getVechicleType ******* ',result)
 		if(result.status == 1){
			dispatch(stopLoading());
			dispatch(GET_VEHICLETYPE_LIST(result.data));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/***
 * get VEHICLE COMPANY api
***/
export const getMakeOfVehicleList = (token) => {

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("admin/getVehicleCompany",{},token).then((result) => {
			console.log('result getVehicleCompany ******* ',result)
 		if(result.status == 1){
			dispatch(stopLoading());
			dispatch(GET_VEHICLECOMPANY_LIST(result.data));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

/***
 * get VEHICLE MODAL api
***/
export const getVehicleModalList = (vehicleid,companyid) => {
  let	requestObject = {
    'vehicle_typeid' : vehicleid,
		"company_id" : companyid,
    }
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("admin/getVehicleModel",requestObject).then((result) => {
			console.log('result getVehicleModel ******* ',result)
 		if(result.status == 1){
			dispatch(stopLoading());
			dispatch(GET_VEHICLEMODAL_LIST(result.data));
	  	}
		}).catch(error => {
	  		console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};



/**
* Initial state
*/
const initialState = {
	deviceToken : "test",
	email       : '',
	otp         : '',
	phone       : '',
	userData    : null,
	driverData  : null,
	driverAvailabilityStatus: true,
	citiesList:[],
	certificatesList:[],
  experienceTypeList:[],
  vehicleTypeList:[],
  vehicleMakeList : [],
  vehicleModelList : [],
  driverStatus : '',
  newdriverStatus:'',
};

/**
* Reducer
*/
export default function reducer(state = initialState, action) {
	//console.log("action verification data phone ************",action.data)
    var newstate = Object.assign({}, state);
    switch (action.type) {
			case REGISTER_NEW_USER:
				return { ...state, userData: action.data };

			case CONSUMER_SIGNUP_PHONE:
				return { ...state, phone:action.data };

			case USER_LOGIN:
				return { ...state, userData: action.data };

			case FORGOT_PASSWORD:
				return { ...state, email: action.data};

			case OTP_VERIFY:
				return { ...state, otp: action.data};

			case DEVICE_TOKEN:
				return { ...state, deviceToken: action.data}

			case GET_DRIVER_DATA:
        newstate.driverData=[];
        newstate.driverData=action.data;
        newstate.driverStatus=action.data.data.driverStatus;
        newstate.newdriverStatus=action.data.data.driverStatus;
        return newstate;
				//return { ...state, driverData: action.data};

      case GET_DRIVER_DATA_STATUS:
        newstate.newdriverStatus=action.data.data.driverStatus;
        return newstate;

			case NAVIGATE_TO_DRIVER_FORM:
				return { ...state, userData: null };

			case DRIVER_FORM_NAV:
				return { ...state, driverData: action.data };

			case DRIVER_AVAILABILITY_STATUS:
				return { ...state, driverAvailabilityStatus: action.data.availableStatus};

			case CITIES_LIST:
				return { ...state, citiesList: action.data};
			case CERTIFICATES_LIST:
			   return { ...state, certificatesList: action.data};

       case EXPERIENCETYPE_LIST:
        return { ...state, experienceTypeList: action.data};

      case VEHICLETYPE_LIST:
        return { ...state, vehicleTypeList: action.data};

      case VEHICLECOMPANY_LIST:
        newstate.vehicleMakeList=[];
        var arr1=[];
        action.data.map((val,i) => {
          arr1.push({value:val.name,tagid:val._id});
        });
        newstate.vehicleMakeList=arr1;
        return newstate;

      case VEHICLEMODAL_LIST:
        newstate.vehicleModelList=[];
        var arr1=[];
        action.data.map((val,i) => {
          arr1.push({value:val.name,tagid:val._id,room:val.room});
        });
        newstate.vehicleModelList=arr1;
        return newstate;

			case LOG_OUT:
				return { ...initialState, deviceToken:state.deviceToken };

			default:
        return state;
    }
}
