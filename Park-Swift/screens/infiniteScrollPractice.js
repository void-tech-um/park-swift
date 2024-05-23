import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const SimpleInfiniteScroll = () => {
  const [data, setData] = useState([]); // State to hold the data
  const [loading, setLoading] = useState(false); // State to track loading state
  const [page, setPage] = useState(1); // State to keep track of the page number
  const limit = 10; // Limit of items to fetch per page

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Simulate API call
      const response = await fetch(`https://api.example.com/data?page=${page}&limit=${limit}`);
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData]); // Append new data to existing data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Effect to fetch data on initial render and when page changes
  useEffect(() => {
    fetchData(); // Fetch data on initial render
  }, [page]);

  // Function to handle end reached event
  const handleEndReached = () => {
    if (!loading) { // Check if data is already being loaded
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  // Function to render each item in the list
  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.title}</Text>
    </View>
  );

  // Function to render loading indicator at the end of the list
  const renderFooter = () => {
    if (!loading) return null; // If data is not being loaded, return null
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#0000ff" />;
  };

  // Render the component
  return (
    <FlatList
      data={data} // Data to render
      renderItem={renderItem} // Function to render each item
      keyExtractor={(item) => item.id.toString()} // Extract unique key for each item
      onEndReached={handleEndReached} // Function to handle end reached event
      onEndReachedThreshold={0.5} // Distance from the end of the list to trigger onEndReached
      ListFooterComponent={renderFooter} // Component to render at the end of the list
    />
  );
};

export default SimpleInfiniteScroll;