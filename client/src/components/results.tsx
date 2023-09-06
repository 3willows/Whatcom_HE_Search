import { Container, Table } from 'react-bootstrap'
import { formatDate } from '@/utils/utilityFunctions'
import '@Styles/results.css'

interface ResultsProps {
  searchResults: {
    case_name: string;
    link: string;
    hearing_date: string;
    decision_date: string;
    hearing_examiner: string;
  }[];
}
function Results({ searchResults }: ResultsProps) {

  const renderSearchResults = () => {
    return searchResults.map((result) => {
        const name = result.case_name
        const link = result.link
        const hearingDate = formatDate(result.hearing_date)
        const decisionDate = formatDate(result.decision_date)
        const hearingExaminer = result.hearing_examiner
        
      return (
        <tr key={link} className='shadow-sm'>
          <td className='case-name'>{name}</td>
          <td className={hearingExaminer === 'Unable to locate.' ? 'unable-to-locate' : ''}>{hearingExaminer}</td>
          <td className={hearingDate === 'Not listed.' ? 'not-listed' : ''}>{hearingDate}</td>
          <td className={decisionDate === 'Not listed.' ? 'not-listed' : ''}>{decisionDate}</td>
          <td>
            <a href={'https://wa-whatcomcounty.civicplus.com/' + link} >
              PDF
            </a>
          </td>
        </tr>
      )
    })
  }

  return(
    <Container className='mt-5'>
      <Table striped hover className='shadow-sm'>
        <thead className='table-header'>
          <tr className='table-header'>
            <th>Case Name</th>
            <th>Hearing Examiner</th>
            <th>Hearing Date</th>
            <th>Decision Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {renderSearchResults()}
        </tbody>
      </Table>
    </Container>
  )
}

export default Results