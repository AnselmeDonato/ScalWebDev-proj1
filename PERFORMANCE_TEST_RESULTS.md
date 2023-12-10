### 1. Measuring the performance of loading the assignment page 

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6/load-perf-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (01.0s), 10/10 VUs, 0 complete and 0 interrupted iterations
default   [  20% ] 10 VUs  1.0s/5s

running (02.0s), 10/10 VUs, 0 complete and 0 interrupted iterations
default   [  40% ] 10 VUs  2.0s/5s

running (03.0s), 10/10 VUs, 40 complete and 0 interrupted iterations
default   [  60% ] 10 VUs  3.0s/5s

running (04.0s), 10/10 VUs, 163 complete and 0 interrupted iterations
default   [  80% ] 10 VUs  4.0s/5s

running (05.0s), 10/10 VUs, 313 complete and 0 interrupted iterations
default   [ 100% ] 10 VUs  5.0s/5s

     data_received..................: 6.4 MB 1.3 MB/s
     data_sent......................: 26 kB  5.1 kB/s
     http_req_blocked...............: avg=54.55µs  p(99)=1.7ms   
     http_req_connecting............: avg=28.99µs  p(99)=963.35µs
     http_req_duration..............: avg=155.54ms p(99)=2.67s   
       { expected_response:true }...: avg=155.54ms p(99)=2.67s   
     http_req_failed................: 0.00%  ✓ 0         ✗ 323 
     http_req_receiving.............: avg=120.67µs p(99)=533.73µs
     http_req_sending...............: avg=14.92µs  p(99)=53µs    
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=155.41ms p(99)=2.67s   
     http_reqs......................: 323    63.879023/s
     iteration_duration.............: avg=155.67ms p(99)=2.67s   
     iterations.....................: 323    63.879023/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10


running (05.1s), 00/10 VUs, 323 complete and 0 interrupted iterations
default ✓ [ 100% ] 10 VUs  5s

### 2. Measuring the performance of submitting assignments 


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6/submit-perf-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (01.0s), 10/10 VUs, 1 complete and 0 interrupted iterations
default   [  20% ] 10 VUs  1.0s/5s

running (02.0s), 10/10 VUs, 247 complete and 0 interrupted iterations
default   [  40% ] 10 VUs  2.0s/5s

running (03.0s), 10/10 VUs, 480 complete and 0 interrupted iterations
default   [  60% ] 10 VUs  3.0s/5s

running (04.0s), 10/10 VUs, 723 complete and 0 interrupted iterations
default   [  80% ] 10 VUs  4.0s/5s

running (05.0s), 10/10 VUs, 956 complete and 0 interrupted iterations
default   [ 100% ] 10 VUs  5.0s/5s

     data_received..................: 376 kB 75 kB/s
     data_sent......................: 181 kB 36 kB/s
     http_req_blocked...............: avg=19.73µs p(99)=562.4µs 
     http_req_connecting............: avg=8.79µs  p(99)=287.35µs
     http_req_duration..............: avg=51.73ms p(99)=430.62ms
       { expected_response:true }...: avg=51.73ms p(99)=430.62ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 966 
     http_req_receiving.............: avg=60.47µs p(99)=128.35µs
     http_req_sending...............: avg=21.64µs p(99)=42.4µs  
     http_req_tls_handshaking.......: avg=0s      p(99)=0s      
     http_req_waiting...............: avg=51.64ms p(99)=430.51ms
     http_reqs......................: 966    192.37115/s
     iteration_duration.............: avg=51.86ms p(99)=430.73ms
     iterations.....................: 966    192.37115/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10


running (05.0s), 00/10 VUs, 966 complete and 0 interrupted iterations
default ✓ [ 100% ] 10 VUs  5s
