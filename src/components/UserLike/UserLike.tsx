import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserLike.css";
import { RootReducer } from "../../modules/reducer";
import { likePhotoReq } from "../../modules/api/user/actions/like";

const UserLike = () => {
  const [result, setResult] = useState<Array<string>>([]);
  const [LikePlace, setLikePlace] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    scrollHeight -= 100;
    if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
      const fetchMoreData = () => {
        setIsLoading(true);
        setResult(result.concat(LikePlace.slice(0, 5)));
        setLikePlace(LikePlace.slice(5));
        setIsLoading(false);
      };
      fetchMoreData();
    }
  }, [result, LikePlace, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLogin) {
        dispatch(
          likePhotoReq(
            { setResult, setLikePlace, setIsLoading },
            setAccessToken
          )
        );
      } else {
        setLikePlace([]);
      }
    };
    fetchData();
  }, [dispatch, isLogin, setAccessToken]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <div className="userLikeWrap">
      <div className="userLike">
        {result?.map((el: any, key: number) => {
          return (
            <div key={key} className="userLike__contents">
              <div className="userLike__img">
                <img src={el.photo} alt="likephoto" />
              </div>
              <div className="userLike__info">
                <p>{el.place}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserLike;
