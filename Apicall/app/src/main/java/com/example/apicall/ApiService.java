package com.example.apicall;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface ApiService {
    @GET("/blogs/products")
    Call<List<ResponseModel>> getData();
}
