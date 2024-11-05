#include <iostream>
#include <algorithm>
#include <numeric>
#include <vector>

using namespace std;
int main()
{
    vector<int> nums;
    nums.push_back(2);
    nums.push_back(3);
    cout << accumulate(nums.begin(), nums.end(), 0) << endl;
    return 0;
}