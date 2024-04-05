package com.example.apicall;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {
    private List<ResponseModel> dataList;
    Context context;
    // Constructor
    public MyAdapter(Context context, List<ResponseModel> dataList) {
        this.dataList = dataList;
        this.context = context;
    }

    // Create new views
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.recyclerview_item, parent, false);
        return new MyViewHolder(itemView);
    }

    // Replace the contents of a view
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        ResponseModel data = dataList.get(position);
        Log.e("INFO", data.toString());
        holder.title.setText(data.getTitle());
        holder.description.setText(data.getDescription());
        holder.price.setText(data.getPrice().toString());
        Picasso.with(context).load(data.getImage()).into(holder.image);

        // Set more data as needed
    }

    // Return the size of your dataset
    @Override
    public int getItemCount() {
        return dataList.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView title;
        public TextView description;
        public TextView price;
        public ImageView image;
        public MyViewHolder(View view) {
            super(view);
            title = view.findViewById(R.id.title);
            description = view.findViewById(R.id.description);
            price = view.findViewById(R.id.price);
            image = view.findViewById(R.id.imageView);
        }
    }
}
