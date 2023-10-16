import * as Yup from "yup";

const companySchema = Yup.object().shape({
  name: Yup.string().min(2, "Company name must be at least 2 characters").max(200).required("Company Name is required"),
  headline: Yup.string().min(2, "Headline must be at least 2 characters").max(200).required("Headline is required"),
  description: Yup.string().min(2, "Description must be at least 2 characters").max(200).required("Description is required"),
  phone: Yup.string().min(2, "Invalid Phone Number").max(50).required("Phone is required"),
  siteUrl: Yup.string().url("Must be a valid URL (e.g. https:// ...)").max(255).required("Website is required"),
  logo: Yup.string().min(2, "Invalid file").max(200).required("Logo is required"),
});

export default companySchema