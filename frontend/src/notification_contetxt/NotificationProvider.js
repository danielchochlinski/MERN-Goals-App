// import React, { createContext, useContext, useReducer } from "react";

// const NotificationContext = createContext();

// const uniqueID = () => {
//   const uniq = "id" + new Date().getTime();
//   return uniq;
// };
// const NotificationProvider = (props) => {
//   const [state, dispatch] = useReducer((state, action) => {
//     switch (action.type) {
//       case "ADD_NOTIFICATION":
//         return [...state, { ...action.payload }];
//         case: "REMOVE_NOTIFICATION":
//         return state.filter((el)=> el.id !== action.id);
//         default:
//             return state;
//     }
//   },[]);
//   return (
//     <NotificationContext.Provider>
//       {props.children}
//     </NotificationContext.Provider>
//   );
// };

// export default NotificationProvider;
