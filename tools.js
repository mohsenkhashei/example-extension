require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const fs = require("fs");
const yupToJsonSchema = require("./yupToJsonSchema");
const customService = require('./data/customService');
const base_url = 'https://dad4-46-252-103-150.ngrok-free.app';


const customerSupportSchema = yup.object().shape({
  Room: yup.string().required('Room is required'),
  Service: yup.string().oneOf(customService, `Title must be either ${joinWithOr(customService)} `).required('Service is required'),
});

const customerSupportJSONSchema = yupToJsonSchema(customerSupportSchema);

const CUSTOMER_SUPPORT = {
  name: "customer_support",
  description:
    "talk to user about the service that they required from customer support like service that we provide",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: customerSupportJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ Room, Service }) => {
    console.log(Room, Service);
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/personnel/call/${Service}/${Room}`
      );
    
      return JSON.stringify(data);
    } catch (err) {
      console.log(err);
      return "Error trying to execute the tool";
    }
  },
};

const personnelReportSchema = yup.object().shape({
  Secret: yup.string().required('secret is required'),
  Personnel: yup.string().required('Personnel is required'),
});

const personnelReportJSONSchema = yupToJsonSchema(personnelReportSchema);
const PERSONNEL_REPORT = {
  name: "personnel_report",
  description:
    "report the personnel task",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: personnelReportJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ Secret, Personnel }) => {
    console.log(Secret, Personnel );
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/tasks/${Personnel}/${Secret}`
      );
    
      return JSON.stringify(data);
    } catch (err) {
      console.log(err);
      return "Error trying to execute the tool";
    }
  },
};


function joinWithOr (array) {
  if (!Array.isArray(array) || array.length === 0) {
    return "";
  }
  return array.join(" or ");
};

const tools = [CUSTOMER_SUPPORT, PERSONNEL_REPORT];
module.exports = tools;
