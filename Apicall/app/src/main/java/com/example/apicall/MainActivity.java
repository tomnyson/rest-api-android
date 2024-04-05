package com.example.apicall;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
    private RecyclerView recyclerView;
    private MyAdapter adapter;
    private List<ResponseModel> dataList = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        recyclerView = findViewById(R.id.myrecycleView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        adapter = new MyAdapter(getApplicationContext(), dataList);
        recyclerView.setAdapter(adapter);

        apiService.getData().enqueue(new Callback<List<ResponseModel>>() {
            @Override
            public void onResponse(Call<List<ResponseModel>> call, Response<List<ResponseModel>> response) {
                if (response.isSuccessful()) {
                    List<ResponseModel> data = response.body();
                    Log.e("INFO", data.toString());
                    // Handle your data here
                    updateData(data);
                } else {
                    // Handle API error
                    Log.e("ERROR", "bi loi");
                    Log.e("ERROR", response.toString());
                    // Handle error, could log or display an error message
                }
            }

            @Override
            public void onFailure(Call<List<ResponseModel>> call, Throwable t) {
                // Handle call failure
            }
        });

    }

    public void updateData(List<ResponseModel> newData) {
        try {
            Log.e("ERROR", newData.toString());;
            dataList.clear();
            dataList.addAll(newData);
            adapter.notifyDataSetChanged();
        } catch (Exception error) {
            Log.e("ERROR", "Error updating data", error);;
        }

    }

}