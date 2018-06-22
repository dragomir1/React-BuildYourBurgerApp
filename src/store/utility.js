// THIS UTILITY FILE IS OPTIONAL.
// THESE ARE UTILITY FUNCTIONS THAT HELP CLEAN UP THE REDUDERS FILES A BIT MORE AND ASSIST IN UPDATING THE STATE.


// this utility function accepts two arguments.  the first is the old object which is what is to be copied and updated, and the second argument is the updated values of the object.
// you need to export it.
 export const updateObject = (oldObject, updatedProperties) = > {
  return {
      ...oldObject,
      {/*this could be a JS object with all the values in want to override.  so we distribute it.*/}
      ...updatedProperties
  }
};
