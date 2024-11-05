#include <iostream>
#include <cmath>
#include <vector>
#include <unordered_map>
#include <set>
#include <queue>
#include <algorithm>

using namespace std;

double find_median_min_heap(vector<int> &arr1, vector<int> &arr2)
{
    set<int> unique;
    int size1 = arr1.size(), size2 = arr2.size();
    // for(int i=0; i<(size1>size2)?size1:size2; i++){

    // }
    for (int num : arr1)
    {
        unique.insert(num);
    }
    for (int num : arr2)
    {
        unique.insert(num);
    }
    vector<int> uniquev(unique.begin(), unique.end());
    sort(uniquev.begin(), uniquev.end());
    int size = uniquev.size();
    if (size % 2 == 0)
    {
        return (uniquev[size / 2 - 1] + uniquev[size / 2]) / 2.0;
    }
    else
    {
        return uniquev[size / 2];
    }
}

int ymin(string s, int y, int x){
    priority_queue<pair<int, char>> maxheap;
    unordered_map<char,int> umap;
    for(char c:s){
        umap[c]++;
    }
    for(auto ele: umap){
        maxheap.push(make_pair(ele.second, ele.first));
    }
    int cost = 0;
    while(maxheap.size()>1){
        cost+=y;
        auto top = maxheap.top();
        maxheap.pop();
        auto top1 = maxheap.top();
        maxheap.pop();
        if(top.first>1) maxheap.push(make_pair(--top.first, top.second));
        if(top1.first>1) maxheap.push(make_pair(--top1.first, top1.second));
    }
    if(maxheap.size()==1){
        auto top2 = maxheap.top();
        cost += (top2.first/2)*x;
    }
    return cost;
}

int main()
{
    int cost = ymin("aabbcc", 2, 3);
    cout<<cost<<endl;;
    // for (int i = 8; i > 0; i--)
    // {
    //     int n = (8) | (8 - 1);
    //     cout << n << " ";
    // }
    // cout << endl;
    // for (int i = 8; i > 0; i--)
    // {
    //     int n = (8) | (i);
    //     cout << n << " ";
    // }
    return 0;
}


