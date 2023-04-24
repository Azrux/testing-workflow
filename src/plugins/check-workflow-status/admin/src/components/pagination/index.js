import React, { useEffect, useState } from "react";
import { Button, Icon, Option, Select } from "@strapi/design-system";
import s from "./index.module.css";

const Pagination = ({ setSlicedWorkflows, workflows, filteredWorkflows, setFilterSliced }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  const itemsPerPage = 5;
  const filteredPages = Math.ceil(filteredWorkflows?.length / itemsPerPage); 
  const allPages = Math.ceil(workflows?.length / itemsPerPage);
  const totalPages = filteredWorkflows?.length > 0 ? filteredPages : allPages
  
  useEffect(() => {
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
    setPages(pagesArray);
  }, [totalPages]);

  useEffect(() => {
    if (currentPage < 1) setCurrentPage(1);
    if (currentPage > totalPages) setCurrentPage(totalPages);
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lasIndex = currentPage * itemsPerPage;
    if(filteredWorkflows) {
      setFilterSliced([...filteredWorkflows].slice(firstIndex, lasIndex));
    } else {
      setSlicedWorkflows([...workflows].slice(firstIndex, lasIndex));
    }
  }, [currentPage]);

  return (
    <div className={s.container}>
      <Button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1 ? true : false}
      >{"<<"}
      </Button>

      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 ? true : false}
      >
        {"<"}
      </Button>

      <Select value={currentPage} onChange={setCurrentPage} size={'S'}>
        {pages.map((p) => {
          return (
            <Option
              value={p}
              key={p}
            >
              {p}
            </Option>
          );
        })}
      </Select>

      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages ? true : false}
      >
        {">"}
      </Button>

      <Button
        onClick={() => setCurrentPage(pages.length)}
        disabled={currentPage === totalPages ? true : false}
      >
        {">>"}
      </Button>
    </div>
  );
};

export default Pagination;
