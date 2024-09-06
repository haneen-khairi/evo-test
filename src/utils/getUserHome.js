export default function getUserHome(user) {
    if (user.roles.length == 0 || user.roles.length == 1 || user.roles[0] == 'Restaurant') {
        return '/restaurant'
    } else {
        return '/dashboard'
    }
}