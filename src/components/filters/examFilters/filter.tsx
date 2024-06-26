import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Filter(props: any) {
  const [open, setOpen] = useState(true);
  const [Search, setSearch] = useState("");
  const handleOpen = () => setOpen(!open);
  
  return (
    <>
      <div className=" p-2">
        <div
          className=" px-2 py-2 flex items-center justify-between border border-zinc-300  rounded-md"
          onClick={handleOpen}
        >
          <span>{props.name}</span>{" "}
          <span>{open ? <FaAngleDown /> : <FaAngleUp />}</span>
        </div>
        {open && (
          <>
            <div className="px-2 py-1">
              <div className="h-full max-h-48 overflow-x-auto">
                {props.name === "Mode" ? (
                  // Mode
                  <>
                    {Search.trim().length === 0 &&
                      props?.filters?.map((filter: any) => {
                        return (
                          <div
                            key={filter?.id}
                            className="flex gap-1 items-center my-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              id={filter.mode}
                              name={filter.mode}
                              checked={
                                props.checked === filter?.attributes?.mode
                              }
                              className=""
                              onChange={() =>
                                props.handleFilter(filter?.attributes?.mode)
                              }
                            />
                            <span className="text-sm font-medium text-secondary-text hover:text-primary">
                              {filter?.attributes?.mode}
                            </span>
                          </div>
                        );
                      })}
                  </>
                ) : props.name === "Stream" ? (
                  // Stream
                  <>
                    {Search.trim().length === 0 &&
                      props?.filters?.map((filter: any) => {
                        return (
                          <div
                            key={filter.id}
                            className="flex gap-1 items-center my-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              id={filter.id}
                              name={filter?.attributes?.streamName}
                              checked={
                                props.checked === filter?.attributes?.streamName
                              }
                              className=""
                              onChange={() =>
                                props.handleFilter(filter?.attributes?.streamName)
                              }
                            />
                            <span className="text-base font-medium text-secondary-text hover:text-primary">
                              {filter?.attributes?.streamName}
                            </span>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {Search.trim().length === 0 &&
                      props?.filters?.map((filter: any) => {
                        return (
                          <div
                            key={filter?.id}
                            className="flex gap-1 items-center my-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              id={filter.name}
                              name={filter.name}
                              checked={
                                props.checked === filter?.attributes?.name
                              }
                              className=""
                              onChange={() =>
                                props.handleFilter(filter?.attributes?.name)
                              }
                            />
                            <span className="text-sm font-medium text-secondary-text hover:text-primary">
                              {filter?.attributes?.name}
                            </span>
                          </div>
                        );
                      })}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
