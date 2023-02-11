export default function ArticlePages({ pages, setCurrentPage, currentPage }) {
  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  }

  return (
    pages.map(page => {
        return <button onClick={(event) => handlePageChange(event)} value={page} disabled={parseInt(currentPage) === page}>{page}</button> 
    })
  )
}