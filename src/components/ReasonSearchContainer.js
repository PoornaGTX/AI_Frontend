import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const ReasonSearchContainer = () => {
  const {
    isLoading,
    handleChange,
    clearValuesAdmin,
    searchMR,
    searchMRType,
    searchTypeMR,
    searchTypeOptionsMR,
    sortMR,
    sortOptionsMR,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    clearValuesAdmin();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRowSelect
            labelText="Reason"
            name="searchMR"
            value={searchMR}
            handleChange={handleSearch}
            list={["all", ...searchMRType]}
          ></FormRowSelect>
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchTypeMR"
            value={searchTypeMR}
            handleChange={handleSearch}
            list={["all", ...searchTypeOptionsMR]}
          ></FormRowSelect>
          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sortMR"
            value={sortMR}
            handleChange={handleSearch}
            list={sortOptionsMR}
          ></FormRowSelect>
          <button
            onClick={handleSubmission}
            disabled={isLoading}
            className="btn btn-block btn-danger"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ReasonSearchContainer;
