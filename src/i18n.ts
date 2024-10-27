import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "EN",
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        EN: {
            translation: {
              posts: "Posts",
              schedule: "Schedule",
              profile: "Profile",
              home: "Home!",
              logIn: "Log In",
              dresscode: "Dress Code",
              ceremony: "Cermony",
              reception: "Reception",
              logOut: "Log Out",
              RSVPpending: "Pending Invite",
              RSVPaccepted: "You have allready accepted this invitation do you want to change your answer?",
              RSVPacceptedPastDue: "You allready said yes to the invitation and the RSVP has expired the deadline if you choose to cancel it is permanent",
              RSVPdeclined: "You have answered no to this invitation, but its not to late to change your reply",
              RSVPdeclinedPastDue: "You allready said no to the invitation and the RSVP deadline has expired",
              RSVPexpiredInvite: "You failed to answer the invite within the deadline",
              errorWrongStatus: "Wrong status set on RSVP, check with support",
              enterWedding: "Enter any wedding you participate in:",
              hello: "Hello",
              orderMenu: "Place your dinner orders here:",
              currentOrders: "Current Orders:",
              deleteOrder: "Delete Order",
              are_you_sure_you_want_to_select: "Are you sure you want to select this option",
              decline: "Decline",
              accept: "Accept",
              contactOus: "Contact us",
              contactEmail: "oyvind.reitan3@gmail.com"
            },
        },
        IT: {
          translation: {
            posts: "Post",
            schedule: "Programma",
            profile: "Profilo",
            home: "Home",
            logIn: "Accedi",
            dresscode: "Dress code",
            ceremony: "Cerimonia",
            reception: "Ricevimento",
            logOut: "Esci",
            RSVPpending: "Invito in sospeso",
            RSVPaccepted: "" + 
                          "You have allready accepted this invitation do you want to change your answer?",
            RSVPacceptedPastDue: "" +
                          "You allready said yes to the invitation and the RSVP has expired the deadline if you choose to cancel it is permanent",
            RSVPdeclined: "" +
                         "You have answered no to this invitation, but its not to late to change your reply",
            RSVPdeclinedPastDue: "" +
                          "You allready said no to the invitation and the RSVP deadline has expired",
            RSVPexpiredInvite: "" +
                          "You failed to answer the invite within the deadline",
            errorWrongStatus: "" +
              "Wrong status set on RSVP, check with support",
            are_you_sure_you_want_to_select: "Sei sicuro di voler scegliere questa opzione",
            enterWedding: "Enter any wedding you participate in:",
            hello: "Ciao",
            orderMenu: "Place your dinner orders here:",
            currentOrders: "Current Orders:",
            deleteOrder: "Delete Order",
            decline: "Rifiuta",
            accept: "Accetta",
            contactOus: "Contattaci",
            contactEmail: "carla.arrigo@hotmail.it"
          },
        },
      },
    },
);

export default i18n;
