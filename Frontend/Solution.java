import java.util.*;
class Solution {
    public boolean judgeSquareSum(int c) {
        
        if (c == 1) {
            return true;
        }
        
        for (int a = 0; a <= (c / 2); a++) {
            if (a * a > c ) {
                return false;
                }
                
            for (int b = 0; b <= (c / 2); b++) {
                if (b * b > c) {
                    break;
                }
                int square = (a * a) + (b * b);
                if (square > c) {
                    break;
                }
                if (square == c) {
                    return true;
                }
               
                
                
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input = sc.nextInt();
        Solution s = new Solution();
       
        s.judgeSquareSum(input);

        System.out.println(s.judgeSquareSum(input));
    }
}