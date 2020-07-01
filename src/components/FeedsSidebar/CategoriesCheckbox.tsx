import React from "react";

type PropsType = {
  label: string;
  setCategories: (category: string) => void;
};

const CategoriesCheckbox: React.FC<PropsType> = ({ label, setCategories }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setCategories(e.target.value);

  return (
    <div className="feeds-categories__item">
      <input
        type="checkbox"
        className="feeds-categories__checkbox"
        id={label}
        value={label}
        onChange={handleChange}
      />
      <label htmlFor={label} className="feeds-categories__label">
        {label}
      </label>
    </div>
  );
};

export default CategoriesCheckbox;
