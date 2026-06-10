import EvaluationForms from "../src/screens/EvaluationForms";
import { savedEvaluation } from "../src/constants/preloadedSavedEvaluation";

export default function Forms() {
    return <EvaluationForms evaluationMetadata={savedEvaluation} />;
}