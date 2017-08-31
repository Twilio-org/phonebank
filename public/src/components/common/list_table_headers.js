const tableInfo = {
  campaigns: {
    headers: [['Name', 'name'], ['Title', 'title'], ['Description', 'description'], ['Status', 'status'], ['Script Id', 'script_id'], ['Contact List', 'contact_lists_id'], ['Date Created', 'created_at']],
    redirect_path: '/admin/campaigns/new'
  },
  scripts: {
    headers: [['Name', 'name'], ['Body', 'body'], ['Description', 'created_at'], ['Created At', 'created_at'], ['Updated At', 'updated_at']],
    redirect_path: '/admin/scripts/new'
  },
  questions: {
    headers: [['Title', 'title'], ['Description', 'description'], ['Type', 'type'], ['Response Options', 'responses'], ['Created At', 'created_at'], ['Updated At', 'updated_at']],
    redirect_path: '/admin/questions/new'
  },
  contact_lists: {
    headers: [['Name', 'name'], ['Created At', 'created_at']],
    redirect_path: '/admin/contactLists/new'
  },
  users: {
    headers: [['First Name', 'first_name'], ['Last Name', 'last_name'], ['Email', 'email'], ['Phone Number', 'phone_number'], ['Admin', 'is_admin'], ['Banned', 'is_banned'], ['Active Status', 'is_active'], ['Joined', 'created_at']],
    redirect_path: null
  }
};

export default tableInfo;

