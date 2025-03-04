module.exports = {
    RespError: {
        type: 'object',
        properties: {
            success: { type: 'boolean', description: 'API 처리결과', example: false },
            message: { type: 'string', description: 'Message', example: "Failed api process" },
            error: { type: 'string', description: 'Exception Message', example: "Error - DB Message" },
        }
    },
    // 사용자 Group
    RespLogin: {
        $returncode: {description: '응답코드'},
        $username: "김영풍",
        $userid: "ypzinc",
        $groupnm: "개발자",
        $groupid: "00000000",
    },
    RespGetUser: {
        $returncode: "Y",
        $username: "김영풍",
        $groupid: "00000000",
        $groupnm: "개발자",
        $password: { format: "password",  example: "00000000" },
        $fail_cnt: 5,
    }

};