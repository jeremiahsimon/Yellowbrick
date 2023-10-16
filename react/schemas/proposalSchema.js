import * as Yup from "yup";

const addProposalsSchema = Yup.object().shape({
    clientId: Yup.number().min(1, "Client must be selected.").max(10000).required("Client must be selected."),
    solicitationStateId: Yup.number().min(1, "State must be selected.").max(51).required("State must be selected."),
    name: Yup.string().min(2, "Proposal name must be at least 2 characters").max(200).required("Proposal name is required."),
    notes: Yup.string().min(2, "Proposal notes must be at least 2 characters").max(200).required("A note is required.")
})

export default addProposalsSchema