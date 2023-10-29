import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
const EducationSearchContainer = () => {
  const {
    isLoading,
    handleChange,
    clearValuesEDU,
    searchEDU,
    searchEDUType,
    searchTypeEDU,
    searchTypeOptionsEDU,
    sortEDU,
    sortOptionsEDU,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    clearValuesEDU();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRowSelect
            labelText="Education Level"
            name="searchEDU"
            value={searchEDU}
            handleChange={handleSearch}
            list={["all", ...searchEDUType]}
          ></FormRowSelect>
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchTypeEDU"
            value={searchTypeEDU}
            handleChange={handleSearch}
            list={["all", ...searchTypeOptionsEDU]}
          ></FormRowSelect>
          {/* sort */}
          <FormRowSelect
            labelText="sort"
            name="sortEDU"
            value={sortEDU}
            handleChange={handleSearch}
            list={sortOptionsEDU}
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

export default EducationSearchContainer;
