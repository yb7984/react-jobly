"use strict";

//mock localStorage
const localStorageMock = {
  data: {},
  getItem: (key) => {
    return data[key] === undefined ? null : data[key];
  },
  setItem: (key, value) => {
    data[key] = value;
  }
}

// token ("testuser" / "password")
const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

module.exports = {
  localStorageMock,
  testToken
};
