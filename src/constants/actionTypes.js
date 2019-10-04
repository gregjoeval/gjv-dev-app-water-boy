// TODO: update description
/**
 Action Type: {NOUN}__{VERB}__{STATE}

 NOUN: the thing you are affecting in application state with your verb

 VERB: the way you are affecting your noun in application state
    FETCH - when the action is dependant on the response of an api call
    RESET - when resetting the value of a property in application state
    SET - when updating the value of a property in application state, without preserving what was in application state
    UPDATE - when updating the value of a property in application state

 STATE: (optional) the state of your verb's affect on your noun
    REQUEST - the beginning of an operation
    SUCCESS - the acceptable or successful outcome
    FAIL - the rejected or failed outcome

 Examples:
 if we are changing the value of a property in application state called "acceptedTerms"
 ACCEPTED_TERMS__UPDATE

 if we are making an api call to a resource called "consents" and changing application state
 CONSENTS__FETCH__REQUEST - the request started
 CONSENTS__FETCH__SUCCESS - the request completed successfully
 CONSENTS__FETCH__FAIL - the request failed
 Note: we have two variations of the end state for this action (SUCCESS/FAIL) so that we can update the application state based on whether we get back an acceptable response or not
 **/

export const VERBS = {
    DELETE: 'DELETE',
    FAIL: 'FAIL',
    RESET: 'RESET',
    REQUEST: 'REQUEST',
    SET: 'SET',
    UPDATE: 'UPDATE'
};

export const REHYDRATE = 'persist/REHYDRATE'; // defined by redux-persist
export const THEME_ID__SET = 'THEME_ID__SET';
export const THEME_TYPE__UPDATE = 'THEME_TYPE__UPDATE';
export const CONFIG__SET = 'CONFIG__SET';
export const CONFIG__RESET = 'CONFIG__RESET';
