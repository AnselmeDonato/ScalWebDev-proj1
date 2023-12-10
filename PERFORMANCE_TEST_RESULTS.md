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


     data_received..................: 179 kB 34 kB/s
     data_sent......................: 86 kB  16 kB/s
     http_req_blocked...............: avg=32.24µs  p(99)=1.3ms   
     http_req_connecting............: avg=15.26µs  p(99)=697µs   
     http_req_duration..............: avg=111.44ms p(99)=686.55ms
       { expected_response:true }...: avg=111.44ms p(99)=686.55ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 460 
     http_req_receiving.............: avg=79.18µs  p(99)=155.04µs
     http_req_sending...............: avg=27.48µs  p(99)=56.4µs  
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=111.33ms p(99)=686.46ms
     http_reqs......................: 460    87.679605/s
     iteration_duration.............: avg=111.63ms p(99)=688.14ms
     iterations.....................: 460    87.679605/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10


running (05.2s), 00/10 VUs, 460 complete and 0 interrupted iterations
default ✓ [ 100% ] 10 VUs  5s