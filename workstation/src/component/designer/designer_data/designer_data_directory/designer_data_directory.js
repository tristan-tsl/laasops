import axios from "axios";

async function query_designer_data_directory() {
  let net_request_result = await axios.post("/distribution/data/directory/select", {});
  // adapter list to tree
  const name_str = "title";
  const description_str = "description";
  const children_str = "children";

  function setup_tree(pid, parent_level_str) {
    const cur_tree_level = [];
    let i = original_tree_list.length;
    while (i--) {
      const originalTreeListElement = original_tree_list[i];
      if (originalTreeListElement["pid"] == pid) {
        original_tree_list.splice(i, 1);
        const cur_level_str = parent_level_str + "," + originalTreeListElement["name"];
        const next_tree_level = setup_tree(originalTreeListElement["id"], cur_level_str);
        const cur_tree_data = originalTreeListElement;
        cur_tree_data["cur_level_str"] = cur_level_str;
        cur_tree_data[name_str] = originalTreeListElement["name"];
        cur_tree_data[description_str] = originalTreeListElement[description_str];
        cur_tree_data["spread"] = true;
        if (next_tree_level.length > 0) {
          cur_tree_data[children_str] = next_tree_level;
        }
        cur_tree_level.push(cur_tree_data);
      }
    }
    return cur_tree_level;
  }
  const tree_data = setup_tree(0, '');
}

export default {
  query_designer_data_directory
}
