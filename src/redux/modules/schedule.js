'use strict';
import {
  Platform,
} from 'react-native';
import moment from 'moment';
import { startLoading, stopLoading} from './app';
import RestClient from '../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { goBack } from './nav';

// Actions
export const SCHEDULE_ORDER_DATE = "SCHEDULE_ORDER_DATE";
export const SCHEDULE_LIST = "SCHEDULE_LIST";
export const DEL_SCHEDULED_ITEM = "DEL_SCHEDULED_ITEM";
export const SCHEDULE_DATE_LIST = "SCHEDULE_DATE_LIST";
export const CITIES_LIST = "CITIES_LIST";
// Action Creators
export const SCHEDULE_ORDER = (data) => ({ type: SCHEDULE_ORDER_DATE,data});
export const GET_SCHEDULE_LIST = (data) => ({ type: SCHEDULE_LIST, data });
export const DELETE_SCHEDULED_ITEM = (data) => ({ type: DEL_SCHEDULED_ITEM, data });
export const GET_SCHEDULE_DATE_LIST = (data) => ({ type: SCHEDULE_DATE_LIST, data });
export const GET_CITIES_LIST = (data) => ({ type: CITIES_LIST, data });

let LocalScheduleList=[];

//perform api's related to user
/*** 
 * MANAGE SCHEDULE TO SET DAY OFF 
***/
export const setDayOFF = (data,token) => {
	//console.log('set day off ******* ',moment(data.dateSelected).format('YYYY-MM-DD'))
	let	requestObject = {
		date:data.dateSelected,
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/setDayOff",requestObject,token).then((result) => {
			console.log('result setDayOff ******* ',result)
 		if(result.status == 1){
				dispatch(stopLoading());
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

/*** 
 * MANAGE SCHEDULE TO SET DAY ON 
***/
export const setDayOn = (data,token) => {
	let	requestObject = {
		date:data.dateSelected,
    }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/setDayOn",requestObject,token).then((result) => {
			console.log('result setDayOn ******* ',result)
 		if(result.status == 1){
				dispatch(stopLoading());
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

// /*** 
//  * ADD SCHEDULE 
// ***/
// export const addSchedule = (data,token) => {
// 	let	requestObject = {
// 		radius:data.radius,
// 		location:data.location,
// 		sDate:data.sDate,
// 		eDate:data.eDate,
// 		defaultScheduleAll:data.defaultScheduleAll,
// 		helper:data.helper
//   	}

// 	return dispatch => {
// 		dispatch(startLoading());
// 		RestClient.post("schedular/add",requestObject,token).then((result) => {
// 			console.log('result schedule add ******* ',result)
//  		if(result.status == 1){
// 			 console.log('inside succeessss ********* ')
// 				dispatch(stopLoading());
// 				dispatch(goBack());
// 				dispatch(ToastActionsCreators.displayInfo(result.message));
// 	  	}else{
// 	    	dispatch(stopLoading());
// 	    	alert(result.message);
// 	  	}
// 		}).catch(error => {
// 	  		console.log("error=> ", error)
// 	  		dispatch(stopLoading());
// 		});
// 	}
// };


/*** 
 * ADD SCHEDULE 
***/
export const addSchedule = (data,token) => {
	let	requestObject = {
		radius:data.radius,
		location:data.location,
		sDate:data.sDate,
		eDate:data.eDate,
		defaultScheduleAll:data.defaultScheduleAll,
		helper:data.helper
  	}

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/add",requestObject,token).then((result) => {
			console.log('result schedule add ******* ',result)
 		if(result.status == 1){
			console.log('LocalScheduleList add schedule 1 ******** ',LocalScheduleList)
				LocalScheduleList.push(result.data.internalScheduleData)
				// console.log('LocalScheduleList add schedule 1 ***',LocalScheduleList)
				dispatch(GET_SCHEDULE_LIST(LocalScheduleList));
				dispatch(stopLoading());
				dispatch(goBack());
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




/*** 
 * List SCHEDULE 
***/
export const listSchedule = (data,token) => {
	LocalScheduleList=[];
	let	requestObject = {
		date:data
  }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/list",requestObject,token).then((result) => {
			console.log('result schedule list ******* ',result)
 		if(result.status == 1){
				dispatch(GET_SCHEDULE_LIST(result.data));
				LocalScheduleList=result.data;
				dispatch(stopLoading());
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


/*** 
 * MERGE SCHEDULE 
***/
export const mergeSchedule = (data,token) => {
	let	requestObject = {
		sDate:data.sDate,
		eDate:data.sDate
  }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/mergeSchedule",requestObject,token).then((result) => {
			console.log('result schedule merge ******* ',result)
 		if(result.status == 1){
				dispatch(stopLoading());
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


/*** 
 * DELETE SCHEDULE 
***/
// export const deleteSchedule = (data,token) => {
// 	let	requestObject = {
// 		id:data.id,
// 		date:data.date,
// 		deleteForAll:false
//   }

// 	return dispatch => {
// 		dispatch(startLoading());
// 		RestClient.post("schedular/delete",requestObject,token).then((result) => {
// 			console.log('result schedule delete ******* ',result)
//  		if(result.status == 1){
// 			//DELETE_SCHEDULED_ITEM(result)
// 			dispatch(stopLoading());
// 			dispatch(ToastActionsCreators.displayInfo(result.message));
// 	  	}else{
// 	    	dispatch(stopLoading());
// 	    	dispatch(ToastActionsCreators.displayInfo(result.message));
// 	  	}
// 		}).catch(error => {
// 	  		console.log("error=> ", error)
// 	  		dispatch(stopLoading());
// 		});
// 	}
// };

/*** 
 * DELETE SCHEDULE 
***/
export const deleteSchedule = (data,token) => {
	let	requestObject = {
		id:data.id,
		date:data.date,
		deleteForAll:false
  }

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/delete",requestObject,token).then((result) => {
			console.log('result schedule delete ******* ',result)
 		if(result.status == 1){
			//DELETE_SCHEDULED_ITEM(result)
			let list=deleteScheduleById(data.id);
			dispatch(GET_SCHEDULE_LIST(list));
			LocalScheduleList=list;

			dispatch(stopLoading());
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

export const deleteScheduleById=(id)=>{
	console.log("LocalScheduleList***",LocalScheduleList)
	let newArray = LocalScheduleList.filter(obj => obj._id != id);
	console.log("newArray***",newArray)
	return newArray
}


/*** 
 * calendor scheduled api
***/
export const scheduledDateList = (data,token) => {

	let	requestObject = {
		startDate:data.startDate,
		endDate:data.endDate,

    }
	console.log('rquest shedule calendor Status ****** ',requestObject)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/getScheduleDateList",requestObject,token).then((result) => {
			console.log('result calendor ******* ',result)
 		if(result.status == 1){
				dispatch(stopLoading());
				dispatch(GET_SCHEDULE_DATE_LIST(result.data));
				
			//	dispatch(ToastActionsCreators.displayInfo(result.status));
			console.log("calendor api response",result)
			
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
 * get cities api
***/
export const getCitiesList = (token) => {

	
	
	return dispatch => {
		dispatch(startLoading());
		RestClient.get("drivers/getCity",{},token).then((result) => {
			console.log('result getCity ******* ',result)
 		if(result.status == 1){
				dispatch(stopLoading());
				dispatch(GET_CITIES_LIST(result.data));
				
			//	dispatch(ToastActionsCreators.displayInfo(result.status));
			console.log("getCity api response",result)
			
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







/**
* Initial state
*/
const initialState = {
  OrderData:{},
  ScreenMaxFlag:true,
  scheduleList: [],
  scheduleDatesList:{},
  citiesList:[]
};

/**
* Reducer
*/
export default function schedule(state = initialState, action) {
	//console.log("action verification data phone ************",action.data)
    switch (action.type) {
        case SCHEDULE_LIST:
			console.log('schedule actions ******** ',action.data)
			return { ...state, scheduleList: action.data};
		case SCHEDULE_DATE_LIST:
		        console.log('scheduleDATE actions ******** ',action.data)
		return { ...state, scheduleDatesList: action.data};
		case CITIES_LIST:
		          console.log('CITIES_LIST actions ******** ',action.data)
        return { ...state, citiesList: action.data};


        default:
          	return state;
    }
}

