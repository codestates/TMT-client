import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./PlaceInput.css";
import { searchSpotPostReq, searchSpotGetReq } from "../../modules/api/place";

function PlaceInput() {
  const [spot, setSpot] = useState<string | any>([]);
  const [spotMatch, setSpotMatch] = useState<string | any>([]);
  const [search, setSearch] = useState<string | any>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchSpotGetReq(setSpot));
  }, [dispatch]);

  const searchPlace = (text: string) => {
    if (!text) {
      setSpotMatch([]);
      setSearch("");
    } else {
      let matchedPlace = spot?.placeOnly?.filter((el: any) => {
        let regex = new RegExp(`${text}`, "gi");
        return el.place.match(regex);
      });
      setSpotMatch(matchedPlace);
      setSearch(text);
    }
  };

  let changeInput = (el: any) => {
    setSearch(el);
    setSpotMatch([el]);
  };

  const sendSearchReq = () => {
    dispatch(searchSpotPostReq({ search, setSearch }));
  };
  return (
    <>
      <input
        className="placeInput"
        type="text"
        list="spotlist"
        placeholder="장소 검색"
        onChange={(e) => searchPlace(e.target.value)}
        value={search || [search] || ""}
      />

      {spotMatch && (
        <div className="placeInput__Container">
          {spotMatch.map((el: any, index: number) => {
            return (
              <div
                onClick={() => changeInput(el.place)}
                className="option"
                key={index}
              >
                <div>{el.place}</div>
              </div>
            );
          })}
        </div>
      )}
      <img
        className="placeInput__Img"
        src="../img/search.png"
        alt=""
        title="장소로 검색"
        onClick={sendSearchReq}
      />
    </>
  );
}

export default PlaceInput;
