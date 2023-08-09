import React from "react";
import Category from "../../components/category/Category";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../axios/api";
import {
  StMainBody,
  StMainContent,
  StContentTitle,
  StCardContainer,
  StCard,
  StCardImg,
  StCardInfo,
  StCardTitle,
  StCardContent,
  StCardAuthor,
} from "./StyledMain";
import { useSelector } from "react-redux";
function Items() {
  const navigate = useNavigate();
  const Subcategory = useSelector((state) => state.subCategory);

  const { data, isLoading, isError, error } = useQuery("posts", async () => {
    const response = await api.get("/posts");
    return response.data;
  });

  let filteredData = data.filter((item) => item.highcategory === "제품 추천")

  if (Subcategory) {
    filteredData = filteredData.filter((item) => item.subcategory === Subcategory);
  }

  // console.log(data)
  // console.log(filteredData)
  // console.log(Subcategory)

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <StMainBody>
        <Category />
        <StMainContent>
          <StContentTitle>제품 추천</StContentTitle>
          <StCardContainer>
            {filteredData.map((item) => (
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/detail/${item.id}`);
                  }}
                >
                  <StCardImg src={item.img} alt="MainImg" />
                  <StCardInfo>
                    <StCardTitle>{item.title}</StCardTitle>
                    <StCardContent>{item.content}</StCardContent>
                  </StCardInfo>
                  <StCardAuthor>{item.author}</StCardAuthor>
                </StCard>
              ))}
          </StCardContainer>
        </StMainContent>
      </StMainBody>
    </>
  );
}

export default Items;
