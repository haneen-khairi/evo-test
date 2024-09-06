import instance from '@/api/instance'

function fetchAllAuditLogs(params) {
    return instance.get(`/users/audit-logs`, {
        params
    }).then(res => res.data)
}
export {
    fetchAllAuditLogs
}