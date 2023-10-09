import React, { useEffect, useState } from "react";
import { validateInputs } from "../../../../common/validation";

const TagsInput = ({ selectedTags, placeholder, inputTags }) => {
  const [tags, setTags] = useState([]);
  const addTags = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (value !== "" && validateInputs("email", value) && tags.indexOf(value) < 0) {
      setTags([...tags, value]);
      selectedTags([...tags, value]);
      event.target.value = "";
    }
  };
  const removeTags = (index) => {
    tags.splice(index, 1);
    setTags([...tags]);
    selectedTags([...tags]);
  };
  useEffect(() => {
    if (inputTags) {
      setTags(inputTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTags]);

  return (
    <div className="tags-input">
      <ul className="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <i
              className="far fa-times-circle ms-2"
              onClick={() => removeTags(index)}
            ></i>
          </li>
        ))}
      </ul>
      <input
        className="form-control bg-transparent border-0"
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder={placeholder}
      />
    </div>
  );
};
export default TagsInput;
