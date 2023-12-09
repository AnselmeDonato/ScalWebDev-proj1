
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6/performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (01.0s), 10/10 VUs, 144 complete and 0 interrupted iterations
default   [  20% ] 10 VUs  1.0s/5s

running (02.0s), 10/10 VUs, 304 complete and 0 interrupted iterations
default   [  40% ] 10 VUs  2.0s/5s

running (03.0s), 10/10 VUs, 480 complete and 0 interrupted iterations
default   [  60% ] 10 VUs  3.0s/5s

running (04.0s), 10/10 VUs, 664 complete and 0 interrupted iterations
default   [  80% ] 10 VUs  4.0s/5s

running (05.0s), 10/10 VUs, 836 complete and 0 interrupted iterations
default   [ 100% ] 10 VUs  5.0s/5s

     data_received..................: 17 MB 3.3 MB/s
     data_sent......................: 68 kB 13 kB/s
     http_req_blocked...............: avg=16.62µs  p(99)=1.13ms  
     http_req_connecting............: avg=8.86µs   p(99)=703.54µs
     http_req_duration..............: avg=59.33ms  p(99)=103.16ms
       { expected_response:true }...: avg=59.33ms  p(99)=103.16ms
     http_req_failed................: 0.00% ✓ 0          ✗ 846 
     http_req_receiving.............: avg=110.79µs p(99)=385.49µs
     http_req_sending...............: avg=13.99µs  p(99)=46.19µs 
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=59.21ms  p(99)=103.02ms
     http_reqs......................: 846   167.501302/s
     iteration_duration.............: avg=59.42ms  p(99)=103.23ms
     iterations.....................: 846   167.501302/s
     vus............................: 10    min=10       max=10
     vus_max........................: 10    min=10       max=10


running (05.1s), 00/10 VUs, 846 complete and 0 interrupted iterations
default ✓ [ 100% ] 10 VUs  5s
