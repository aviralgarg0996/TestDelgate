/*
 * @file: ConstantStrings.js
 * @description: Constant Strings for the application
 * @date: 06.04.2018
 * @author: Pooja Singh
 * */

'use strict';
module.exports = {
  email :{
    title : 'EMAIL VERIFICATION',
    desc : 'Enter the verification code received on your registered email to proceed.',
    placeholderText : 'Enter Code',
    buttonText : 'CONFIRM'
  },
  forgotpassword : {
    title : 'FORGOT PASSWORD',
    desc : 'Do not worry! Enter your registered Email and we will send you the verification code to reset your password.',
    placeholderText : 'EMAIL',
    buttonText : 'RESET'
  },
  resetpassword : {
    title : 'RESET PASSWORD',
    desc : '',
    placeholderText : 'SET PASSWORD',
    buttonText : 'RESET'
  },
  newuser : {
    title : '',
    desc : 'Congratulations, you successfully created an account. Please, fill out the Rabbit Form, and submit it for review.',
    placeholderText : '',
    buttonText : 'GOT IT'
  },
  phone :{
    title : 'PHONE VERIFICATION',
    desc : 'Enter the verification code received on your registered phone number to proceed.',
    placeholderText : 'Enter Code',
    buttonText : 'CONFIRM'
  },
  OnSubmit :{
    title : 'YOUR APPLICATION IS\r\nUNDER PROCESS!',
    desc : 'While we are processing your application, you can schedule yourself and build up your profile to attract more customers.\r\nuse the below link to learn how to do it.',
    placeholderText : '',
    buttonText : 'GOT IT'
  },
  OnReject :{
    title : 'YOUR APPLICATION\r\nREQUIERS MORE\r\nDOCUMENT OR DETAILS',
    desc : 'What to do?\r\n An agent will help you to complete the application. Then make correction and ',    
    placeholderText : '',
    buttonText : ''
  },
  AdminMessage :{
    title : 'BY DELEGATE ADMINISTRATOR',
    desc : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the '+
            'industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    placeholderText : '',
    buttonText : 'GOT IT',
  },
  mergeSchedule :{
    title : 'MERGE SCHEDULES',
    desc : 'Your schedule has conflict with one of the existing schedule. \r\nDo you want to merge them?',
    placeholderText : '',
    buttonText : 'OK'
  },
  setDayOff :{
    title : 'SET DAY OFF',
    desc : 'By setting your day Off you won\'t receive any new order\'s notification.\r\n\r\n Do you still want  to set the day OFF?',
    placeholderText : '',
    buttonText1 : 'YES',
    buttonText2 : 'NO'
  },
  setDayOn :{
    title : 'SET WORKING DAY',
    desc : 'Nice, now you can schedule yourself to earn more money.',
    placeholderText : '',
    buttonText : 'OK'
  },
  driverPersonal : {
    firstname : 'FIRST NAME*',
    lastname : 'LAST NAME*',
    dob : 'DATE OF BIRTH*',
    sex : 'GENDER',
    sin : 'SIN/SSN*',
    address : 'ADDRESS',
    licenceNo : 'DRIVER LICENCE NO.',
    experience : 'EXPERIENCE TYPE',
    jobExperience : 'ADD IMAGES RELATED TO YOUR EXPERIENCE',
    aboutUS : 'TELL PEOPLE ABOUT YOUR SKILLS',
    certificates : 'CHOOSE CERTIFICATES',
    locationServe : 'CITIES YOU SERVE*',
    notes : 'YOUR LOCATION WILL BE ASSUMED TO BE IN 1000M RADIUS ',
    save : 'SAVE CHANGES',
    next : 'NEXT',
  },
  driverVehicle : {
    vehicleNo : 'VEHICLE PLATE NO.*',
    vehicleType : 'VEHICLE TYPE*',
    makeOfVehicle : 'MAKE OF VEHICLE*',
    vehicleModel : 'MODEL OF VEHICLE*',
    year : 'YEAR OF VEHICLE',
    equipment : 'EQUIPMENT',
    insuranceNo : 'INSURANCE NO.*',
    insuranceExpiry : 'INSURANCE EXPIRY',
    vehicleImages : 'ADD VEHICLE IMAGES',
    documents : 'ADD DOCUMENTS*',
    agreement : 'I CONFIRM THAT THE INFORMATION GIVEN IN THIS FORM IS TRUE, COMPLETE AND ACCURATE.',
    save : 'SAVE CHANGES',
    submit : 'SUBMIT FOR REVIEW',
  },
  DropDownItems:{
    gender:[
      {value:'please select...',tagid:''},
      {value:'Male',tagid:'gender'},
      {value:'Female',tagid:'gender'}
    ],
    // licenceYear:[
    //   {value:'2015',tagid:'licenceYear'},
    //   {value:'2016',tagid:'licenceYear'},
    //   {value:'2017',tagid:'licenceYear'},
    //   {value:'2018',tagid:'licenceYear'},
    //   {value:'2019',tagid:'licenceYear'},
    //   {value:'2020',tagid:'licenceYear'}
    // ],
    licenceYear:[
      {value:'please select...',tagid:''},
      {value:'0',tagid:'licenceYear'},
      {value:'1',tagid:'licenceYear'},
      {value:'2',tagid:'licenceYear'},
      {value:'3',tagid:'licenceYear'},
      {value:'4',tagid:'licenceYear'},
      {value:'5',tagid:'licenceYear'},
      {value:'6',tagid:'licenceYear'},
      {value:'7',tagid:'licenceYear'},
      {value:'8',tagid:'licenceYear'},
      {value:'9',tagid:'licenceYear'},
      {value:'10',tagid:'licenceYear'},
      {value:'11',tagid:'licenceYear'},
      {value:'12',tagid:'licenceYear'},
      {value:'13',tagid:'licenceYear'},
      {value:'14',tagid:'licenceYear'},
      {value:'15',tagid:'licenceYear'},
      {value:'16',tagid:'licenceYear'},
      {value:'17',tagid:'licenceYear'},
      {value:'18',tagid:'licenceYear'},
      {value:'19',tagid:'licenceYear'},
      {value:'20',tagid:'licenceYear'},
      {value:'20+',tagid:'licenceYear'},
    ],
    licenceMonth:[
      {name:'Jan',tagid:'licenceMonth'},
      {name:'Feb',tagid:'licenceMonth'},
      {name:'Mar',tagid:'licenceMonth'},
      {name:'Apr',tagid:'licenceMonth'},
      {name:'May',tagid:'licenceMonth'},
      {name:'Jun',tagid:'licenceMonth'},
      {name:'Jul',tagid:'licenceMonth'},
      {name:'Aug',tagid:'licenceMonth'},
      {name:'Sep',tagid:'licenceMonth'},
      {name:'Oct',tagid:'licenceMonth'},
      {name:'Nov',tagid:'licenceMonth'},
      {name:'Dec',tagid:'licenceMonth'}
    ],
    experienceYear:[
      {name:'2015',tagid:'experienceYear'},
      {name:'2016',tagid:'experienceYear'},
      {name:'2017',tagid:'experienceYear'},
      {name:'2018',tagid:'experienceYear'},
      {name:'2019',tagid:'experienceYear'},
      {name:'2020',tagid:'experienceYear'}
    ],
    // experienceYear:[
    //   {name:'1',tagid:'experienceYear'},
    //   {name:'2',tagid:'experienceYear'},
    //   {name:'3',tagid:'experienceYear'},
    //   {name:'4',tagid:'experienceYear'},
    //   {name:'5',tagid:'experienceYear'},
    //   {name:'6',tagid:'experienceYear'},
    //   {name:'7',tagid:'experienceYear'},
    //   {name:'8',tagid:'experienceYear'},
    //   {name:'9',tagid:'experienceYear'},
    //   {name:'10',tagid:'experienceYear'},
    //   {name:'11',tagid:'experienceYear'},
    //   {name:'12',tagid:'experienceYear'},
    //   {name:'13',tagid:'experienceYear'},
    //   {name:'14',tagid:'experienceYear'},
    //   {name:'15',tagid:'experienceYear'},
    //   {name:'16',tagid:'experienceYear'},
    //   {name:'17',tagid:'experienceYear'},
    //   {name:'18',tagid:'experienceYear'},
    //   {name:'19',tagid:'experienceYear'},
    //   {name:'20',tagid:'experienceYear'},
    // ],
    // experienceMonth:[
    //   {value:'Jan',tagid:'experienceMonth'},
    //   {value:'Feb',tagid:'experienceMonth'},
    //   {value:'Mar',tagid:'experienceMonth'},
    //   {value:'Apr',tagid:'experienceMonth'},
    //   {value:'May',tagid:'experienceMonth'},
    //   {value:'Jun',tagid:'experienceMonth'},
    //   {value:'Jul',tagid:'experienceMonth'},
    //   {value:'Aug',tagid:'experienceMonth'},
    //   {value:'Sep',tagid:'experienceMonth'},
    //   {value:'Oct',tagid:'experienceMonth'},
    //   {value:'Nov',tagid:'experienceMonth'},
    //   {value:'Dec',tagid:'experienceMonth'}
    // ],
    experienceMonth:[
      {value:'please select...',tagid:''},
      {value:'0',tagid:'experienceMonth'},
      {value:'1',tagid:'experienceMonth'},
      {value:'2',tagid:'experienceMonth'},
      {value:'3',tagid:'experienceMonth'},
      {value:'4',tagid:'experienceMonth'},
      {value:'5',tagid:'experienceMonth'},
      {value:'6',tagid:'experienceMonth'},
      {value:'7',tagid:'experienceMonth'},
      {value:'8',tagid:'experienceMonth'},
      {value:'9',tagid:'experienceMonth'},
      {value:'10',tagid:'experienceMonth'},
      {value:'11',tagid:'experienceMonth'},
    ],
    certificates:[
      {value:'please select...',tagid:'certificates'},
      {value:'certificate1',tagid:'certificates'},
      {value:'certificate2',tagid:'certificates'},
      {value:'certificate3',tagid:'certificates'},
      {value:'certificate4',tagid:'certificates'},
      {value:'certificate5',tagid:'certificates'},
    ],
    vehicleType:[
      {value:'please select...',tagid:''},
      {value:'vehicleType1',tagid:'vehicleType'},
      {value:'vehicleType2',tagid:'vehicleType'},
      {value:'vehicleType3',tagid:'vehicleType'},
      {value:'vehicleType4',tagid:'vehicleType'},
      {value:'vehicleType5',tagid:'vehicleType'},
    ],
    vehicleMake:[
      {value:'please select...',tagid:''},
      {value:'vehicleMake1',tagid:'vehicleMake'},
      {value:'vehicleMake2',tagid:'vehicleMake'},
      {value:'vehicleMake3',tagid:'vehicleMake'},
      {value:'vehicleMake4',tagid:'vehicleMake'},
      {value:'vehicleMake5',tagid:'vehicleMake'},
    ],
    vehicleModel:[
      {value:'please select...',tagid:''},
      {value:'vehicleModel1',tagid:'vehicleModel'},
      {value:'vehicleModel2',tagid:'vehicleModel'},
      {value:'vehicleModel3',tagid:'vehicleModel'},
      {value:'vehicleModel4',tagid:'vehicleModel'},
      {value:'vehicleModel5',tagid:'vehicleModel'},
    ],
    equipment:[
      {value:'please select...',tagid:''},
      {value:'equipment1',tagid:'equipment'},
      {value:'equipment2',tagid:'equipment'},
      {value:'equipment3',tagid:'equipment'},
      {value:'equipment4',tagid:'equipment'},
      {value:'equipment5',tagid:'equipment'},
    ],
    vehicleYear:[
      {value:'please select...',tagid:''},
      {value:'2015',tagid:'vehicleYear'},
      {value:'2016',tagid:'vehicleYear'},
      {value:'2017',tagid:'vehicleYear'},
      {value:'2018',tagid:'vehicleYear'},
      {value:'2019',tagid:'vehicleYear'},
      {value:'2020',tagid:'vehicleYear'}
    ],
    insuranceExpiryYear:[
      {value:'please select...',tagid:''},
      {value:'2015',tagid:'insuranceExpiryYear'},
      {value:'2016',tagid:'insuranceExpiryYear'},
      {value:'2017',tagid:'insuranceExpiryYear'},
      {value:'2018',tagid:'insuranceExpiryYear'},
      {value:'2019',tagid:'insuranceExpiryYear'},
      {value:'2020',tagid:'insuranceExpiryYear'}
    ],
    experienceType:[
      {value:'please select...',tagid:''},
      {value:'Delivery',tagid:'experienceType'},
      {value:'Moving',tagid:'experienceType'},
      {value:'Furniture Assembly',tagid:'experienceType'},
      {value:'Appliances Installation',tagid:'experienceType'},
      {value:'Furniture White-Gloves',tagid:'experienceType'},
      {value:'Forklift License',tagid:'experienceType'},
      {value:'Food Delivery',tagid:'experienceType'},
      {value:'Food Safety Certificate',tagid:'experienceType'}
    ],
    citiesServe:[
      {value:'please select...',tagid:''},
      {value:'City 1',tagid:'citiesServe'},
      {value:'City 2',tagid:'citiesServe'},
      {value:'City 3',tagid:'citiesServe'},
      {value:'City 4',tagid:'citiesServe'},
      {value:'City 5',tagid:'citiesServe'},
      {value:'City 6',tagid:'citiesServe'}
    ],
  },
};
