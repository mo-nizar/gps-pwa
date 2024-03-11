import React from "react";
import "@styles/components/CustomDropdown.scss";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

interface Option {
  id: number | string;
  label: string;
  link?: string;
}

interface CustomDropdownProps {
  title: string;
  viewMore?: boolean;
  link?: string;
  optionsList: Option[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  title,
  viewMore,
  link,
  optionsList,
}) => {

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button">
        {title}
        <img
          src="/icons/caret-down.svg"
          style={{ color: "white" }}
          alt="caret-down"
        />
      </button>
      <div className="dropdown-content">
        {optionsList.map((obj) => (
          <a onClick={()=>handleNavigation(`${obj.link}/?key=${obj.id}` as string)} key={obj.id}>
            <span>{obj.label}</span>
          </a>
        ))}

        {viewMore && (
          <a key={2222} onClick={()=>handleNavigation(link as string)} className="viewAll">
            <span>
              {"View all"}
              <img src="/icons/long-arrow-right.svg" alt="long-arrow-right" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
