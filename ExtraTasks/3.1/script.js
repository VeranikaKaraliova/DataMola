(function() {
    const arrNum = [-2,1,-3,4,-1,2,1,-5,4];
    
    function sumArr(arr) {
        let sum = 0;
        let maxSum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
            if (sum > maxSum) {
                maxSum = sum;
            };
            if (sum <0) {
                sum = 0;
            }  
        }
        return maxSum;
    }
    console.log('Максимальная сумма непрерывного подмассива = ', sumArr(arrNum))
}());