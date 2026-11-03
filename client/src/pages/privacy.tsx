// Components
import LegalPage from '../components/legal/legalPage';

// Translations
import { legal } from '../translations/trans.legal';

/** Privacy policy (Quebec Law 25). DRAFT: to be approved by the client and confirmed by a lawyer. */
const Privacy = () => <LegalPage title={legal.privacy.title} sections={legal.privacy.sections} />;

export default Privacy;
