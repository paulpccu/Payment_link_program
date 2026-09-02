(function () {
  "use strict";

  window.CROWN_PAYMENT_LINKS = {
    // Generated from crown_camp_names.xlsx. Edit the workbook, then run:
    // node tools/build-payment-config.mjs
    appendVicidialQuery: true,
    camps: [
      {
        name: "AMERICAN COALITION FOR POLICE AND SHERIFFS PAC",
        abbreviation: "ACPS",
        keys: ["acps","american coalition for police and sheriffs","coalition for police and sheriffs pac","american coalition of police and sheriffs pac","coalition of police and sheriffs pac"],
        paymentUrl: "https://cpfpac.lovable.app/acps"
      },
      {
        name: "AMERICAN FIREFIGHTERS COALITION PAC",
        abbreviation: "AFC",
        keys: ["afc","american firefighters coalition","american firefighters coaltion pac"],
        paymentUrl: "https://donorprocess.com/merchant/american-firefighters-coalition-pac/"
      },
      {
        name: "AMERICAN VETERANS DEPARTMENT OF NEW YORK",
        abbreviation: "NYAMVETS",
        keys: ["nyamvets","ny amvets","new york amvets","american veterans department of new york"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=672841187878"
      },
      {
        name: "AMERICAN VETERANS SUPPORT COMMITTEE PAC",
        abbreviation: "AVSC",
        keys: ["avsc","american veterans support committee"],
        paymentUrl: "https://cpfpac.lovable.app/avsc"
      },
      {
        name: "COALITION FOR HOMELESS AND DISABLED VETERANS PAC",
        abbreviation: "CHDVPAC",
        keys: ["chdvpac","chdv","coalition for homeless and disabled veterans"],
        paymentUrl: ""
      },
      {
        name: "COALITION FOR PARAMEDICS AND FIREFIGHTERS PAC",
        abbreviation: "CFPFF",
        keys: ["cfpff","coalition for paramedics and firefighters"],
        paymentUrl: "https://cpfpac.lovable.app/CFPFF"
      },
      {
        name: "COMMITTEE FOR PARAMEDICS AND FIREFIGHTERS PAC",
        abbreviation: "CPFT",
        keys: ["cpft","committee for paramedics and firefighters"],
        paymentUrl: "https://cpfpac.lovable.app/donate-live"
      },
      {
        name: "COMMITTEE FOR POLICE OFFICERS DEFENSE",
        abbreviation: "CPOD",
        keys: ["cpod","committee for police officers defense"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=235457988443&C_memo=TAMS DO NOT DELETE"
      },
      {
        name: "DARE DRUG ABUSE RESISTANCE EDUCATION",
        abbreviation: "DARE",
        keys: ["dare","drug abuse resistance education"],
        paymentUrl: "https://donorprocess.com/merchant/dare/"
      },
      {
        name: "FIREFIGHTERS CHARITABLE FOUNDATION",
        abbreviation: "FCF",
        keys: ["fcf","firefighters charitable foundation"],
        paymentUrl: "https://donorprocess.com/?merchant=firefighters-charitable-foundation"
      },
      {
        name: "FIREFIGHTERS SUPPORT ALLIANCE",
        abbreviation: "FFSA",
        keys: ["ffsa","firefighters support alliance"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=481131873855&C_memo=TAMS%20DO%20NOT%20DELETE HELP"
      },
      {
        name: "FLORIDA POLICE AND TROOPERS ASSOCIATION",
        abbreviation: "FLPTA",
        keys: ["flpta","florida police and troopers association"],
        paymentUrl: "https://donorprocess.com/merchant/florida-police-and-troopers-association/"
      },
      {
        name: "HANDICAPPED VETERANS SERVICE INITIATIVE PAC",
        abbreviation: "HSCDIPAC",
        keys: ["hscdipac","hscdi","hscid","handicapped veterans service initiative"],
        paymentUrl: "https://donorprocess.com/merchant/handicapped-veterans-service-initiative-pac/"
      },
      {
        name: "LAW ENFORCEMENT AGAINST DRUGS",
        abbreviation: "LEAD",
        keys: ["lead","law enforcement against drugs"],
        paymentUrl: "https://cpfpac.lovable.app/LEAD"
      },
      {
        name: "MICHIGAN FRATERNAL ORDER OF POLICE FUND",
        abbreviation: "MIFPAC",
        keys: ["mifpac","michigan fraternal order of police fund","michigan fraternal order of police political fund"],
        paymentUrl: "https://donorprocess.com/merchant/michigan-fop-political-fund/"
      },
      {
        name: "NATIONAL COALITION FOR DISABLED VETERANS PAC",
        abbreviation: "NCDV",
        keys: ["ncdv","national coalition for disabled veterans"],
        paymentUrl: "https://donorprocess.com/merchant/national-coalition-for-disabled-veterans/"
      },
      {
        name: "NATIONAL COMMITTEE FOR VOLUNTEER FIREFIGHTERS PAC",
        abbreviation: "NCVF",
        keys: ["ncvf","national committee for volunteer firefighters"],
        paymentUrl: "https://donorprocess.com/merchant/national-committee-for-volunteer-firefighters/"
      },
      {
        name: "NATIONAL EMERGENCY RESPONDERS COALITION",
        abbreviation: "NERC",
        keys: ["nerc","national emergency responders coalition"],
        paymentUrl: "https://donorprocess.com/merchant/nerc/"
      },
      {
        name: "NATIONAL FALLEN OFFICER FOUNDATION",
        abbreviation: "NFOF",
        keys: ["nfof","national fallen officer foundation","national fallen officers foundation"],
        paymentUrl: "https://donorprocess.com/merchant/national-fallen-officers-foundation/"
      },
      {
        name: "NATIONAL POLICE SUPPORT FUND",
        abbreviation: "NPSF",
        keys: ["npsf","national police support fund"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=324999384173&C_memo=AMS%20DO%20NOT%20DELETE"
      },
      {
        name: "NEW JERSEY POLICE OFFICERS FOUNDATION",
        abbreviation: "NJPOF",
        keys: ["njpof","new jersey police officers foundation"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=593229149826"
      },
      {
        name: "PENNSYLVANIA NARCOTICS OFFICERS ASSOCIATION",
        abbreviation: "PNOA",
        keys: ["pnoa","pennsylvania narcotics officers association"],
        paymentUrl: "https://cpfpac.lovable.app/PNOA"
      },
      {
        name: "POLICE ADVOCACY COMMITTEE PAC",
        abbreviation: "PADVPAV",
        keys: ["padvpav","padv","police advocacy committee"],
        paymentUrl: ""
      },
      {
        name: "POLICE AND SHERIFFS SUPPORT ALLIANCE PAC",
        abbreviation: "PSSA",
        keys: ["pssa","police and sheriffs support alliance"],
        paymentUrl: "https://donorprocess.com/merchant/police-and-sheriffs-support-alliance-pac/"
      },
      {
        name: "POLICE AND TROOPERS RELIEF FOUNDATION",
        abbreviation: "PTRF",
        keys: ["ptrf","police and troopers relief foundation"],
        paymentUrl: "https://donorprocess.com/merchant/police-and-troopers-relief-foundation/"
      },
      {
        name: "POLICE OFFICERS ACTION COMMITTEE PAC",
        abbreviation: "POACOM",
        keys: ["poacom","police officers action committee"],
        paymentUrl: ""
      },
      {
        name: "POLICE OFFICERS ALLIANCE PAC",
        abbreviation: "POAC",
        keys: ["poac","police officers alliance"],
        paymentUrl: "https://donorprocess.com/merchant/police-officers-alliance-pac/"
      },
      {
        name: "POLICE OFFICERS SUPPORT ASSOCIATION PAC",
        abbreviation: "POSA",
        keys: ["posa","police officers support association","police officers support association pac"],
        paymentUrl: "https://donorprocess.com/merchant/police-officers-support-association-pac/"
      },
      {
        name: "POLICE OFFICERS SUPPORT COMMITTEE PAC",
        abbreviation: "POSC",
        keys: ["posc","police officers support committee"],
        paymentUrl: "https://cpfpac.lovable.app/posc"
      },
      {
        name: "TEXAS COALITION OF POLICE AND SHERIFFS",
        abbreviation: "TXCOPS",
        keys: ["txcops","txcop","texas coalition of police and sheriffs"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=369534627952"
      },
      {
        name: "TEXAS FALLEN OFFICER FOUNDATION",
        abbreviation: "TXFOF",
        keys: ["txfof","texas fallen officer foundation","texas fallen officers foundation"],
        paymentUrl: "https://donorprocess.com/merchant/texas-fallen-officers-foundation/"
      },
      {
        name: "THE POLICE ASSOCIATION OF VIRGINIA",
        abbreviation: "PAVA",
        keys: ["pava","police association of virginia"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=918888947261"
      },
      {
        name: "THE POLICE CONFERENCE OF NEW YORK",
        abbreviation: "PCNY",
        keys: ["pcny","police conference of new york"],
        paymentUrl: "https://www.sagepayments.net/eftcart/forms/donate.asp?M_id=822693743854"
      },
      {
        name: "THE UNITED VETERANS OF AMERICA PAC",
        abbreviation: "UNVET",
        keys: ["unvet","united veterans of america"],
        paymentUrl: ""
      },
      {
        name: "VETERANS ASSISTANCE ACTION FUND PAC",
        abbreviation: "VAF",
        keys: ["vaf","veterans assistance action fund"],
        paymentUrl: ""
      },
      {
        name: "VETERANS ASSOCIATION OF AMERICA",
        abbreviation: "VAA",
        keys: ["vaa","veterans association of america"],
        paymentUrl: "https://cpfpac.lovable.app/vaa"
      },
      {
        name: "VOLUNTEER FIREFIGHTERS ALLIANCE",
        abbreviation: "VFA",
        keys: ["vfa","volunteer firefighters alliance"],
        paymentUrl: "https://cpfpac.lovable.app/donate-live-2"
      },
      {
        name: "VOLUNTEER FIREFIGHTERS SUPPORT COMMITTEE PAC",
        abbreviation: "VOFFSC",
        keys: ["voffsc","volunteer firefighters support committee"],
        paymentUrl: ""
      }
    ]
  };
}());
