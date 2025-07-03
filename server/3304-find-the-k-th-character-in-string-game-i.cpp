class Solution {
public:
    char kthCharacter(int k) {
        string res="a";
        while(res.size()<k){
            string temp="";
            for(char ch : res){

            if(ch=='z'){
                temp=+'a';
            }
            else{
                temp+=ch+1;
            }
            }
            res+=temp;
        }
        return res[k-1];
    }
};
