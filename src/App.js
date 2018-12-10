import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import getData, { columns, years, statuses, countries, states } from "./data";
import isEqual from "lodash/isEqual";
import "./app.css";

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

const isValid = value =>
  (isString(value) && value.length > 0) || (isNumber(value) && value > -1);

const format = value => (isString(value) ? value.trim() : value);

const deepClone = value => JSON.parse(JSON.stringify(value));

class App extends PureComponent {
  state = {
    open: false,
    data: [],
    dataIndex: -1,
    row: []
  };

  validateRow = row => row.every(value => isValid(value));

  formatRow = row => row.map(value => format(value));

  onRowClick = (_, { dataIndex }) => {
    this.setState(({ data }) => ({
      open: true,
      dataIndex,
      row: [...data[dataIndex]]
    }));
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleCancel = () => {
    this.setState(({ data, dataIndex, row }) => {
      if (!isEqual(row, data[dataIndex]))
        if (window.confirm("abandon changes?")) return {};
        else return {};
      else return {};
    });
  };

  handleSave = () => {
    this.setState(({ dataIndex, data, row }) => {
      if (this.validateRow(this.formatRow(row))) {
        data[dataIndex] = row;
        return { data: deepClone(data), open: false };
      }
    });
  };

  handleAdd = () => {
    const row = {};
    this.setState(data => ({
      data: [...data, row],
      row,
      open: true
    }));
  };

  handleChange = index => ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(({ row }) => {
      row[index] = value;
      return { row: { ...row } };
    });
  };

  fetchData = () => {
    const ENDPOINT_URL = "localhost:8080/essays";
    let results;
    try {
      ({ data: results } = axios.get(ENDPOINT_URL));
    } catch (error) {
      results = [];
    }
    return results;
  };

  async componentDidMount() {
    let data;
    if (this.props.env === "prod") data = await this.fetchData();
    else data = getData(69);
    this.setState({ data });
  }

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      onRowClick: this.onRowClick,
      rowsPerPage: 15,
      rowsPerPageOptions: [15, 25, 50, 100]
    };
    const { data, row, open } = this.state;
    const [
      id,
      essay,
      prompt,
      college,
      year,
      status,
      name,
      email,
      country,
      state,
      featured,
      image,
      date,
      source,
      comments,
      views
    ] = row;
    const { classes } = this.props;
    return (
      <>
        <MUIDataTable
          title="Essays Dashboard"
          data={data}
          columns={columns}
          options={options}
        />
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="lg">
          <DialogTitle>Edit Essay</DialogTitle>
          <DialogContent>
            <form>
              <fieldset>
                <legend>Essay</legend>
                <TextField
                  onChange={this.handleChange(1)}
                  label="essay"
                  type="text"
                  value={essay}
                  multiline
                  rows={10}
                  required
                  fullWidth
                  error={!isValid(essay)}
                />
                <TextField
                  onChange={this.handleChange(2)}
                  label="prompt"
                  type="text"
                  value={prompt}
                  multiline
                  rows={2}
                  required
                  fullWidth
                />
                {/* TODO autocomplete or dropdown ? */}
                <TextField
                  onChange={this.handleChange(3)}
                  label="college"
                  type="text"
                  value={college}
                  required
                  fullWidth
                />
                <FormControl className={classes.formControl} required>
                  <InputLabel>Year</InputLabel>
                  <Select value={year} onChange={this.handleChange(4)}>
                    {years.map((year, idx) => (
                      <MenuItem key={idx} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} required>
                  <InputLabel>status</InputLabel>
                  <Select value={status} onChange={this.handleChange(5)}>
                    {statuses.map((status, idx) => (
                      <MenuItem key={idx} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </fieldset>
              <fieldset>
                <legend>Author</legend>
                <TextField
                  onChange={this.handleChange(6)}
                  label="name"
                  type="text"
                  value={name}
                  required
                  fullWidth
                />
                <TextField
                  label="email"
                  type="email"
                  value={email}
                  disabled
                  fullWidth
                />
                <FormControl className={classes.formControl} required>
                  <InputLabel>country</InputLabel>
                  <Select value={country} onChange={this.handleChange(8)}>
                    {countries.map((country, idx) => (
                      <MenuItem key={idx} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} required>
                  <InputLabel>state</InputLabel>
                  <Select value={state} onChange={this.handleChange(9)}>
                    {states.map((state, idx) => (
                      <MenuItem key={idx} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </fieldset>
              <fieldset>
                <legend>Meta</legend>
                <TextField
                  label="id"
                  type="text"
                  value={id}
                  required
                  fullWidth
                  disabled
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(featured)}
                      onChange={this.handleChange(10)}
                      color="primary"
                    />
                  }
                  label="featured"
                />
                <TextField
                  onChange={this.handleChange(11)}
                  label="image"
                  type="number"
                  value={image}
                  required
                  fullWidth
                />
                <TextField
                  label="date"
                  type="text"
                  value={date}
                  disabled
                  fullWidth
                />
                <TextField
                  onChange={this.handleChange(13)}
                  label="source"
                  type="url"
                  value={source}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChange(14)}
                  label="comments"
                  type="text"
                  value={comments}
                  fullWidth
                  multiline
                  rows={2}
                  required
                />
                <TextField
                  label="views"
                  type="number"
                  value={views}
                  fullWidth
                  disabled
                />
              </fieldset>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSave}
              color="primary"
              disabled={!this.validateRow(row)}
            >
              save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
  env: PropTypes.string.isRequired
};

export default withStyles(styles)(App);
