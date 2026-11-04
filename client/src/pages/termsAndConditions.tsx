// Components
import LegalPage from '../components/legal/legalPage';

// Translations
import { legal } from '../translations/trans.legal';

/**
 * Terms of use of the website. DRAFT: to be approved by the client and confirmed by a lawyer.
 * Replaces the manufacturer's sale terms that had been copied here (removed Nov. 2026; still in git history).
 */
const TermsAndConditions = () => <LegalPage title={legal.terms.title} sections={legal.terms.sections} />;

export default TermsAndConditions;
