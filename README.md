## 1. 동작 프로세스
> * createOneuser Mutation을 이용하여 유저 생성
> * login query를 이용하여 token 발급
> * 해당 token을 HTTP HEADER(authorization) : "Bearer ${token}" 형태로 사용
> * createOnedocument Mutation을 이용하여 게시물 생성 (이하 ```data:{}```의 arguments들)
>   * ```document_title:string``` : 제목
>   * ```document_classification:string``` : 분류
>   * ```document_content:string``` : 내용
>   * ```approver_list:{ set:${ user_id[] } }``` : 결재자 목록
> * 전체 유저별 목록조회
>   * 로그인한 유저만 조회하는 경우 ```users``` -> ```user(email:string)```
> * approvalDocument mutation을 이용하여 문서 승인 (이하 ```approvalDocumentInput```의 arguments들)
>   * ```approvalDocumentList: documentId[]``` : 승인하고자 하는 문서목록
>   * ```approvalStatusList: boolean[]``` : 문서별 승인여부
>   * ```approvalCommentList: string[]``` : 문서별 코멘트 여부(코멘트 하지 않을 경우 null로 채워야함)
>   * 위의 array들은 동일한 length를 가져야함
> * 위의 유저별 목록 조회로 돌아가 정상적으로 반영되었는지 확인
> * Approval History 조회

## 2. 예제 쿼리
> * 유저 3명 생성 쿼리
> ```
> mutation{
>  createOneuser(data:{email:"developer@google.com",name:"개발자"}){
>    user_id
>    email
>    name
>  }
>}
>```
> ```
> mutation{
>  createOneuser(data:{email:"designer@gmail.com",name:"디자이너"}){
>    user_id
>    email
>    name
>  }
>}
>```
> ```
> mutation{
>  createOneuser(data:{email:"pm@gmail.com",name:"PM"}){
>    user_id
>    email
>    name
>  }
>}
>```
>* 로그인 쿼리
>```
> query{
>  login(email:"ltnscp9028@gmail.com"){
>   token #해당 토큰을 playground->HTTP HEADERS에 1번 문서를 참고하여 넣으시오.
>    user{
>      user_id
>      email  
>    }
>  }
>}
>```
>* 문서 3개 생성 쿼리
>```
>mutation{
>  createOnedocument(data:{
>      document_title:"PM - 기획문서",
>      document_classification:"plan",
>      document_content:"PM - 기획문서",
>    	approver_list:{
>        set:[1]
>      }
>  }){
>    document_id
>    document_title
>    
>    author{
>      user_id
>      email
>    }
>    next_approver{ #다음번에 결재해야할 사람
>      user_id
>      email
>    }
>    approver_list
>    is_approval_list
>    approval_status
>  }
>}
>```
>```
>mutation{
>  createOnedocument(data:{
>      document_title:"디자인 시안",
>      document_classification:"design",
>      document_content:"figma",
>    	approver_list:{
>        set:[1,2,3]
>      }
>  }){
>    document_id
>    document_title
>    
>    author{
>      user_id
>      email
>    }
>    next_approver{ #다음번에 결재해야할 사람
>      user_id
>      email
>    }
>    approver_list
>    is_approval_list
>    approval_status
>  }
>}
>```
>```
>mutation{
>  createOnedocument(data:{
>      document_title:"코드리뷰",
>      document_classification:"code-review",
>      document_content:"+2Days PR",
>    	approver_list:{
>        set:[1,2]
>      }
>  }){
>    document_id
>    document_title
>    
>    author{
>      user_id
>      email
>    }
>    next_approver{ #다음번에 결재해야할 사람
>      user_id
>      email
>    }
>    approver_list
>    is_approval_list
>    approval_status
>  }
>}
>```
>* 전체 유저의 문서상태 보기
>```
>query{
>  users{
>    user_id
>    email
>    name
>    inbox_document(where:{
>      approval_status:{
>        equals:DOING
>      }
>    }){
>      document_id
>      document_content
>      approval_status
>    }
>    outbox_document(where:{
>      approval_status:{
>        equals:DOING
>      }
>    }){
>      document_id
>      document_content
>      approval_status
>    }
>    archive_document(where:{
>      approval_status:{
>        not:{
>          equals:DOING
>        }
>      }
>    }){
>        document_id
>        document_content
>        approval_status
>    }
>  }
> } 
> ```
>* 문서 결재 쿼리
> ```
>mutation{
>  approvalDocument(
>    approvalDocumentInput:{
>      approvalDocumentList:[1,2,3],
>      approvalStatusList:[true,false,true],
>      approvalCommentList:["승인","reject!!",null]
>    }
>  ){
>    document_id
>    document_title
>  }
>}
>```
>* 다시 전체문서 조회쿼리 실행 후 결과 확인
>* approval History 확인
>```
>query{
>  approvalHistories{
>    approval_history_id
>    approval_comment
>    is_approval
>    approver{
>      email
>      name
>    }
>  }
>}
>```