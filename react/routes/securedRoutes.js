import HousingStatus from "components/clients/housing/HousingStatus";
import RequiredDocuments from "components/documents/RequiredDocuments";
import RequestedDocuments from "components/documents/RequestedDocuments";
import { lazy } from "react";
const AnalyticsDashboards = lazy(() =>
  import("../components/dashboard/analytics/Analytics")
);
const ClientEmployment = lazy(() =>
  import("../components/clients/employment/ClientEmployment")
);
const ClientIncome = lazy(() =>
  import("../components/clients/income/ClientIncome")
);
const ClientsList = lazy(() => import("../components/clients/ClientsList"));
const ClientProperties = lazy(() =>
  import("../components/clients/assets/ClientProperties")
);
const ClientProtection = lazy(() =>
  import("../components/clients/protection/ClientProtection")
);
import CompanyList from "components/companies/CompanyList";
import CompanyForm from "components/companies/CompanyForm";
import FilesUploadExample from "components/fileupload/FilesUploadExample";
import FaqAdd from "components/faqs/FaqAdd";
import FaqAdmin from "components/faqs/FaqAdmin";
import ProposalDetails from "components/proposals/ProposalDetails";

//const FilesUpload = lazy(() => import("../components/fileupload/FilesUpload"));
const ForbiddenPage = lazy(() => import("../components/error/ForbiddenPage"));
const PersonalInformation = lazy(() =>
  import("../components/clients/PersonalInformation")
);
const newClient = lazy(() => import("../components/clients/NewClient"));
const PageNotFound = lazy(() => import("../components/error/Error404"));
const Mortgages = lazy(() => import("../components/clients/housing/Mortgages"));
const ShortTermDebt = lazy(() =>
  import("../components/clients/debts/ShortTermDebt")
);
const SingleFileUpload = lazy(() =>
  import("../components/fileupload/SingleFileUpload")
);
const LocationsForm = lazy(() => import("../components/location/LocationForm"));
const InvestmentAccounts = lazy(() =>
  import("../components/clients/assets/InvestmentAccounts")
);
const RetirementAccounts = lazy(() =>
  import("../components/clients/assets/RetirementAccounts")
);
const AdminInvite = lazy(() => import("../components/admin/AdminInvite"));
const ChangeStatus = lazy(() => import("../components/admin/ChangeStatus"));
const DashboardHome = lazy(() =>
  import("../components/dashboard/DashboardHome")
);
const AdminDashboard = lazy(() =>
  import("../components/dashboard/AdminDashboard")
);
const AdvisorDashboard = lazy(() =>
  import("../components/dashboard/AdvisorDashboard")
);
const AgentDashboard = lazy(() =>
  import("../components/dashboard/AgentDashboard")
);
const ClientDashboard = lazy(() =>
  import("../components/dashboard/ClientDashboard")
);
const HealthInsurance = lazy(() =>
  import("../components/clients/protection/HealthInsurance")
);
const LifeInsurance = lazy(() =>
  import("../components/clients/protection/LifeInsurance")
);
const DisabilityInsurance = lazy(() =>
  import("../components/clients/protection/DisabilityInsurance")
);

const Clients = lazy(() => import("../components/clients/Client"));
const UsersList = lazy(() => import("../components/user/UsersList"));
const UserSettings = lazy(() => import("../components/user/UserSettings"));
const Proposals = lazy(()=> import ("../components/proposals/ProposalsList"));
const ProposalForm = lazy(()=> import ("../components/proposals/ProposalForm"));
const Appointments = lazy(() =>
  import("../components/appointments/Appointments")
);
const Notes = lazy(() => import("../components/notes/Notes"));
const Courses = lazy(() => import("../components/courses/Courses"));
const LectureForm = lazy(() => import("../components/lecture/LectureForm"));
const LectureList = lazy(() => import("../components/lecture/LectureList"));
const coursesDetail = lazy(() =>
  import("../components/courses/CoursesDetails")
);
const AllCourses = lazy(() => import("../components/courses/AllCourses"));
const ClientExpenses = lazy(() =>
  import("../components/expenses/ClientExpenses")
);

const LicenseForm = lazy(() => import("../components/license/LicenseForm"));
const LicenseList = lazy(() => import("../components/license/LicenseList"));
const AgentList = lazy(() => import("../components/AgentList"));
const Beneficiaries = lazy(() =>
  import("../components/beneficiaries/Beneficiaries")
);
const BeneficiariesList = lazy(() =>
  import("../components/beneficiaries/BeneficiariesList")
);
const ProductsForm = lazy(() => import("../components/products/ProductForm"));
const Products = lazy(() => import("../components/products/ProductList"));
const ProductsInfo = lazy(() => import("../components/products/ProductDetail"));
const ProductEdit = lazy(() => import("../components/products/ProductEdit"));
const AddCourse = lazy(() => import("../components/courses/AddCourse"))


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    element: DashboardHome,
    roles: ["Admin", "Agent", "Advisor", "Client"],
    icon: "uil-home-alt",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/client",
        name: "Client Dashboard",
        element: ClientDashboard,
        roles: ["Admin", "Advisor", "Agent", "Client"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

const proposals = [
  {
    path: "/proposals",
    name: "Proposals",
    element: Proposals,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/add-proposal",
    name: "ProposalForm",
    element: ProposalForm,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
];

const clients = [
  {
    path: "/clients/:clientId/proposals/:proposalId",
    name: "ProposalDetails",
    exact: true,
    element: ProposalDetails,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
];

const companies = [
  {
    path: "/companies/",
    name: "CompanyList",
    element: CompanyList,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/companies/create",
    name: "CompanyForm",
    element: CompanyForm,
    roles: ["Admin", "Advisor", "Agent"],
    exact: true,
    isAnonymous: false,
  },
];

const test = [
  {
    path: "/single-upload",
    name: "SingleFileUpload",
    exact: true,
    element: SingleFileUpload,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
  {
    path: "/files-test",
    name: "FilesUploadExample",
    exact: true,
    element: FilesUploadExample,
    roles: ["Admin", "Advisor", "Agent"],
    isAnonymous: false,
  },
];

const allRoutes = [
  ...clients,
  ...dashboardRoutes,
  ...proposals,
  ...companies,
  ...test,
];

export default allRoutes;
