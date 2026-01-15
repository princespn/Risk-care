 

npm install puppeteer 

npm install html2pdf.js 

npm install -g sequelize-cli 

npm install node-cron 

npm install typeorm reflect-metadata 

  

npx drizzle-kit generate:mysql 

npx drizzle-kit push:mysql 

npm install drizzle-orm mysql2 

npm install drizzle-orm drizzle-kit @types/node -D 

npx drizzle-kit push 

npx drizzle-kit introspect:mysql--existing db 

  

Generate migration SQL: 

  

npx drizzle-kit generate 

  

  

Push schema changes to the DB: 

  

npx drizzle-kit push 

  

  

Run migrations: 

  

npx drizzle-kit migrate 

  

  

Studio (UI to explore DB): 

  

npx drizzle-kit studio 

  

npm install drizzle-orm drizzle-kit @types/node --save-dev 

  

npm install typescript tsx --save-dev 

npm run db:generate 

npm run db:migrate 

npm run db:push 

npm run db:studio 

  

npm run db:generate 

  

pm2 restart riskcare-api 

  

npm install nodemailer 

  

npm install bootstrap 

  

pm2 delete riskcare-api 

pm2 start src/index.js --name riskcare-api 

pm2 save 

pm2 startup 

  

pm2 logs riskcare-api 

 

    Fortus documentation.  The latest Fortus documentation is available for download at the link below.  The documentation is for the Fortus data model, the Leads Web Service, etc. 

URL:  https://updates.compu-quote.com/webclients 

Username:  RISKCARE 

Password:   4DG5TM7 (case sensitive) 

  
	

 
	

 
	

 

  

    Test Account.  Credentials for Applied are required to use the web services.  Below, are the credentials for the TEST versions of the web services.   

  

             Username:  RiskCareFo00 

             Password:  4DG5TM7 (case sensitive) 

*note*: some of the web services, like the Rating Web Service, require that this password be Base64 encoded.  You can do that through code, or you could just use NERHNVRNNw== 

  

    Rating Web Service. 

              URL: https://asicanuat.appliedcloudservices.com/RatingWebService/Version1.asmx 

Credentials:  as per above; password needs to be Base64 encoded. 

  

    RateBridge Web Service. 

              URL: https://asicanuat2.appliedcloudservices.com/RateBridge/Version1.asmx 

Credentials:  as per above; password needs to be Base64 encoded. 

  

    Leads Web Service. 

URL: https://asicanuat2.appliedcloudservices.com/ezLeadsWebService/ezLeadsExportService.asmx 

Credentials:  as per above; password does NOT need to be Base64 encoded. 

From:  RiskCare 

To:  RISKCARETEST 

  

*note*:  the client/broker end (ie the desktop system, ie Applied Rating Services) will also have to be configured to receive these leads.  We can configure the receiving end of the leads process in Applied Rating Services, with: 

  

                             Account:  Risk Care Test Account   (for example) 

URL:  https://asicanuat2.appliedcloudservices.com/ezLeadsWebService/ezLeadsExportService.asmx 

Logon:  RISKCARETEST 

Password: 12345 

Product: Leads Web Service 

Site:  RiskCare 

  
	

 
	

 
	

 

Aviva 
	

GA 
	

Auto Ontario 
	

RateBridge Web Service  
See RateBridge_SOAPRequest_Ex_Aviva_Auto.xml for more info. 

Aviva Journey 
	

GA2 
	

Auto Ontario 
	

RateBridge Web Service  
See RateBridge_SOAPRequest_Ex_Aviva_Auto.xml for more info. 

Intact Insurance 
	

HAL 
	

Auto Ontario 
	

RateBridge Web Service 
See RateBridge_SOAPRequest_Ex_Intact_AutoON.xml for more info. 

Intact Insurance - my Driving discount  
	

HAL3 
	

Auto Ontario 
	

RateBridge Web Service 
See RateBridge_SOAPRequest_Ex_Intact_AutoON.xml for more info. 

SGI Canada 
	

SGI 
	

Auto Ontario 
	

Ratebridge Web Service 
RateBridge_SOAPRequest_Ex_SGI_Auto_Version2.xml for more info. 

Wawanesa Mutual 
	

WAWA 
	

Auto Ontario 
	

Ratebridge Web Service 
See RateBridge_SOAPRequest_Ex_Wawanesa_Auto.xml for more info 

Wawanesa Telematics 
	

WAW3 
	

Auto Ontario 
	

Ratebridge Web Service 
See RateBridge_SOAPRequest_Ex_Wawanesa_Auto.xml for more info 

Aviva 
	

GA 
	

Hab Ontario 
	

RateBridge Web Service 
See RateBridge_SOAPRequest_Ex_Aviva_Property_Ratebridge.xml for more info. 

Intact Insurance 
	

HAL 
	

Hab Ontario 
	

RateBridge Web Service 
RateBridge_SOAPRequest_Ex_Intact_Hab_Ratebridge.xml for more info. 

SGI Canada 
	

SGI 
	

Hab Ontario 
	

See RateBridge_SOAPRequest_Ex_SGI_Hab_Version2.xml for more info. 

Wawanesa Mutual                    
	

WAWA 
	

Hab Ontario 
	

Ratebridge Web Service 
 
See RateBridge_SOAPRequest_Ex_Wawanesa_Hab.xml for more info 

{ 

  "quoteGuid": "3989337B2869470388DB7478B0206AD4", 

  "quoteIterationGuid": "D98236C5E59143618D7DF79AF858A236", 

  "carrierquoteGuid": "3989337B2869470388DB7478B0206AD4", 

  "province": "ON", 

  "renewal": "NO", 

  "carriersXml": ["GA", "GA2", "TRG", "TRG2", "COA", "ECON", "DOC", "DOC3", "DOC2", "FAC", "HAL", "HAL3", "JEV", "PAF", "PEM", "SGI", "CIC", "WAW3", "WAWA"], 

  "originalPolicyEffdate": "20250501", 

  "originalQuotedate": "20250503", 

  "transactiondate": "20250503", 

  "effdate": "20330909", 

  "combinedPolicy": "A", 

  "contractAttrs": { 

    "vorGA": "A1000023937", 

    "vorCOA": "B0151-14", 

    "vorDOC": "6753604", 

    "vorHAL": "45893", 

    "vorECON": "6823", 

    "vorHAL3": "45893", 

    "vorJEV": "55812", 

    "vorSGI": "B0151-13", 

    "vorCIC": "6723604", 

    "vorWAWA": "0785077" 

  }, 

  "clientInfo": { 

    "id": "000000000064962", 

    "postalCode": "L7A4M2", 

    "province": "ON" 

  }, 

  "vehicles": [ 

    { 

      "BodyType": "P4", 

      "DistanceDaily": 5, 

      "DistanceYearly": 9000, 

      "FuelType": 3, 

      "Hybrid": "N", 

      "ID": "00030777", 

      "Location": "WOODSTOCK", 

      "LocationIndex": 1208, 

      "MakeAndModel": "IS 300 4DR AWD", 

      "Manufacturer": "LEXUS", 

      "nCylinders": 6, 

      "NightParking": "Driveway", 

      "Owned": "N", 

      "PostalCode": "N4T0P5", 

      "ProductLine": "Personal", 

      "PurchaseCondition": "N", 

      "PurchaseDate": "20220501", 

      "PurchasePrice": 60000, 

      "Territory": 105, 

      "ValueNew": 47775, 

      "VehType": "Private Passenger", 

      "VehUse": "Pleasure", 

      "VICCCode": 1780, 

      "VICCCodeExt": 178000, 

      "VRAB": 33, 

      "VRColl": 54, 

      "VRComp": 60, 

      "VRLiab": 54, 

      "WinterTires": "Y", 

      "Year": 2023, 

      "AntitheftDevice": [ 

        { "DeviceType": "Monitored", "ID": 1, "Manufacturer": "Tag" }, 

        { "DeviceType": "Engraving", "ID": 2, "Manufacturer": "Tag" } 

      ], 

      "Coverage": [ 

        { "CSIOCode": "TPBI", "ID": "01", "Limit1": 1000000 }, 

        { "CSIOCode": "TPPD", "ID": "02", "Limit1": 1000000 }, 

        { "CSIOCode": "TPDC", "ID": "03", "Deductible": 0 }, 

        { "CSIOCode": "AB", "ID": "04" }, 

        { "CSIOCode": "AP", "ID": "05", "Deductible": 1000 }, 

        { "CSIOCode": "UA", "ID": "06" }, 

        { "CSIOCode": "5A", "ID": "07" }, 

        { "CSIOCode": "20", "ID": "08", "Limit2": 1500 }, 

        { "CSIOCode": "27", "ID": "09", "Limit1": 50000 }, 

        { "CSIOCode": "35", "ID": "10" }, 

        { "CSIOCode": "41", "ID": "11" }, 

        { "CSIOCode": "44", "ID": "12", "Limit1": 1000000 }, 

        { "CSIOCode": "ACCW", "ID": "13" }, 

        { "CSIOCode": "MCP", "ID": "14" }, 

        { 

          "ID": "15", 

          "CSIOCode": "FEE", 

          "vorGA": "SkipBranch", 

          "vorGA2": "SkipBranch", 

          "vorTRG": "SkipBranch", 

          "vorTRG2": "SkipBranch", 

          "vorCOA": "SkipBranch", 

          "vorECON": "SkipBranch", 

          "vorDOC": "SkipBranch", 

          "vorDOC3": "SkipBranch", 

          "vorDOC2": "SkipBranch", 

          "vorHAL": "SkipBranch", 

          "vorHAL3": "SkipBranch", 

          "vorJEV": "SkipBranch", 

          "vorPAF": "SkipBranch", 

          "vorPEM": "SkipBranch", 

          "vorSGI": "SkipBranch", 

          "vorCIC": "SkipBranch", 

          "vorWAW3": "SkipBranch", 

          "vorWAWA": "SkipBranch" 

        } 

      ] 

    } 

  ], 

  "drivers": [ 

    { 

      "AirBrake": "N", 

      "AutoCompanyCode": "TRG", 

      "Birthdate": "19960113", 

      "DateContinuousInsurance": "20170501", 

      "DateWithCompany": "20230501", 

      "DriverTraining": "N", 

      "Gender": "F", 

      "ID": "00033999", 

      "MaritalStatus": "M", 

      "MotoAdvancedTraining": "N", 

      "PostSecDegree": "N", 

      "RelationshipToApplicant": "Insured", 

      "DriverLicense": [ 

        { 

          "Country": "CA", 

          "ID": 1, 

          "LicenseClass": "G", 

          "LicenseDate": "20180102", 

          "ProvinceState": "ON" 

        }, 

        { 

          "Country": "CA", 

          "ID": 2, 

          "LicenseClass": "G2", 

          "LicenseDate": "20170102", 

          "ProvinceState": "ON" 

        }, 

        { 

          "Country": "CA", 

          "ID": 3, 

          "LicenseClass": "G1", 

          "LicenseDate": "20160102", 

          "ProvinceState": "ON" 

        } 

      ] 

    }, 

    { 

      "AirBrake": "N", 

      "AutoCompanyCode": "TRG", 

      "Birthdate": "19950309", 

      "DateContinuousInsurance": "20130327", 

      "DateWithCompany": "20230501", 

      "DriverTraining": "N", 

      "Gender": "M", 

      "ID": "00034000", 

      "MaritalStatus": "M", 

      "MotoAdvancedTraining": "N", 

      "OutsideExp": "Y", 

      "PostSecDegree": "N", 

      "RelationshipToApplicant": "Spouse", 

      "DriverLicense": [ 

        { 

          "Country": "CA", 

          "ID": 1, 

          "LicenseClass": "G", 

          "LicenseDate": "20130327", 

          "ProvinceState": "ON" 

        } 

      ], 

      "GroupPlan": [ 

        { 

          "GroupPlanDescr": "ECON 10", 

          "ID": 1, 

          "VehType": "Private Passenger" 

        } 

      ] 

    } 

  ] 

} 

 
